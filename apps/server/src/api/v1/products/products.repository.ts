// apps/server/src/api/v1/products/products.repository.ts
import { InferSelectModel, eq, sql, asc, desc, ilike, and, between, inArray } from 'drizzle-orm'; // Add inArray
import { PostgresJsDatabase } from "drizzle-orm/postgres-js"; // Adjust DB client type if needed
import {
  products as productsSchema,
  productVariants as productVariantsSchema,
  productCategories as productCategoriesSchema, // Need join table for categories
  attributes as attributesSchema, // Needed to process variant attributes
  attributeValues as attributeValuesSchema, // Needed to process variant attributes
} from "@/db/schema/products.schema.js";
import { db, schema } from "@/db/index.js"; // Assuming your Drizzle client and schema are exported from here
import { AppError } from "@/lib/errors/AppError.js"; // Assuming you have an index exporting these
import { NotFoundError} from "@/lib/errors/NotFoundError.js"; // Assuming you have an index exporting these
// Import types from this module
import {
  DBProduct,
  DBProductVariant,
  ProductWithDetails, // Use the type intended for API output
  GetProductsInput, // Use the input type for filtering/pagination
  ProductVariantWithDetails, // Use the type for detailed variants
  DBAttribute, // Imported from schema, but useful for types
  DBAttributeValue, // Imported from schema, but useful for types
  ProductDimensions, // <--- Add this import
} from "./products.types.js";
// Infer the schema type for the database client
type DBSchema = typeof schema;
type DBClient = PostgresJsDatabase<DBSchema>;

export class ProductRepository {
  constructor(private db: DBClient) {}

  /**
   * Helper to process variant attributes from { attributeId: valueId } to { attributeName: valueLabel }.
   * This requires fetching Attribute and AttributeValue data.
   * In a real app, you might cache attribute/value names or fetch them once.
   * For simplicity here, we assume attribute/value data is available or can be fetched.
   * A more robust solution would involve joining or pre-fetching.
   */
  private async processVariantAttributes( 
    variants: DBProductVariant[]
  ): Promise<ProductVariantWithDetails[]> {
    if (!variants || variants.length === 0) {
      return [];
    }

    // Get all attribute and attribute value IDs used in these variants
    const attributeValueIds = new Set<string>();
    for (const variant of variants) {
      if (variant.attributes) {
        Object.values(variant.attributes).forEach((valueId) =>
          attributeValueIds.add(valueId)
        );
      }
    }

    if (attributeValueIds.size === 0) {
      // If no attributes found, return variants as is, casting to the detailed type (attributes will be empty processed)
      return variants.map((v) => ({ ...v, attributes: {} as any }));
    }

    // Fetch all relevant attribute values and their corresponding attribute names
    // This is a simplified join; might need optimization for large numbers of variants/attributes
    const attributeDetails = await this.db
      .select({
        valueId: attributeValuesSchema.id,
        valueLabel: attributeValuesSchema.label,
        attributeId: attributesSchema.id,
        attributeName: attributesSchema.name,
        attributeSlug: attributesSchema.slug, // Include slug for key if preferred
      })
      .from(attributeValuesSchema)
      .innerJoin(
        attributesSchema,
        eq(attributeValuesSchema.attributeId, attributesSchema.id)
      )
      .where(
        sql`${attributeValuesSchema.id} IN ${Array.from(attributeValueIds)}`
      ); // Use SQL template for IN clause

    const attributeDetailsMap = new Map(
      attributeDetails.map((detail) => [detail.valueId, detail])
    );

    // Process each variant's attributes
    return variants.map((variant) => {
      const processedAttributes: Record<string, string> = {}; // { attributeName: valueLabel }
      if (variant.attributes) {
        for (const [attributeId, valueId] of Object.entries(
          variant.attributes
        )) {
          const detail = attributeDetailsMap.get(valueId);
          if (detail) {
            processedAttributes[detail.attributeName] = detail.valueLabel; // Map name to label
            // Or use slug: processedAttributes[detail.attributeSlug] = detail.valueLabel;
          }
        }
      }
      // Cast to the detailed type, ensuring 'attributes' matches ProcessedVariantAttributes
      return {
        ...variant,
        attributes: processedAttributes,
      } as ProductVariantWithDetails;
    });
  }

  /**
   * Finds a single product by its ID.
   * Fetches related brand, categories, and variants.
   * @param id The product ID.
   * @returns The product with details, or undefined.
   */
  async findById(id: string): Promise<ProductWithDetails | undefined> {
    const result = await this.db.query.products.findFirst({
      where: eq(productsSchema.id, id),
      with: {
        brand: true,
        categories: {
          columns: {
            categoryId: true, // Only get the category ID from the join table
            isPrimary: true,
          },
          with: {
            category: {
              // Fetch the actual category details
              columns: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        variants: true, // Fetch raw variants first
      },
    });

    if (!result) {
      return undefined;
    }

    // Process variant attributes { attributeId: valueId } to { attributeName: valueLabel }
    const variantsWithProcessedAttrs = await this.processVariantAttributes(
      result.variants
    );

    // Map categories from join table structure to a simpler array
    const simplifiedCategories = result.categories.map((pc) => pc.category);

    // Combine result with processed variants and simplified categories
    // Need to manually construct the ProductWithDetails shape
    const productWithDetails: ProductWithDetails = {
      ...result, // Spread basic product fields
      dimensions: result.dimensions as ProductDimensions | null, // Cast jsonb dimensions
      brand: result.brand, // Include brand if fetched
      categories: simplifiedCategories, // Include simplified categories
      variants: variantsWithProcessedAttrs, // Include processed variants
      // Drizzle already maps string[] for images, and string for decimals
      // The spread `...result` should handle images, basePrice, salePrice, weight, rating correctly
      images: result.images, // Just to be explicit
      basePrice: result.basePrice,
      salePrice: result.salePrice,
      weight: result.weight,
      rating: result.rating,
    };

    return productWithDetails;
  }

  /**
   * Finds a single product by its slug.
   * Fetches related brand, categories, and variants.
   * @param slug The product slug.
   * @returns The product with details, or undefined.
   */
  async findBySlug(slug: string): Promise<ProductWithDetails | undefined> {
    const result = await this.db.query.products.findFirst({
      where: eq(productsSchema.slug, slug),
      with: {
        brand: true,
        categories: {
          columns: {
            categoryId: true,
            isPrimary: true,
          },
          with: {
            category: {
              columns: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        variants: true,
      },
    });

    if (!result) {
      return undefined;
    }

    // Process variant attributes
    const variantsWithProcessedAttrs = await this.processVariantAttributes(
      result.variants
    );

    // Map categories from join table structure to a simpler array
    const simplifiedCategories = result.categories.map((pc) => pc.category);

    // Combine result with processed variants and simplified categories
    const productWithDetails: ProductWithDetails = {
      ...result,
      dimensions: result.dimensions as ProductDimensions | null,
      brand: result.brand,
      categories: simplifiedCategories,
      variants: variantsWithProcessedAttrs,
      images: result.images,
      basePrice: result.basePrice,
      salePrice: result.salePrice,
      weight: result.weight,
      rating: result.rating,
    };

    return productWithDetails;
  }

  /**
   * Finds multiple products based on filters, pagination, and sorting.
   * Might fetch limited related data for list view (e.g., main image, price, brand name).
   * @param input Filtering, pagination, and sorting parameters.
   * @returns An array of products (possibly simplified) and the total count.
   */
  async findMany(
    input: GetProductsInput
  ): Promise<{ products: ProductWithDetails[]; total: number }> {
    const {
      limit = 10,
      offset = 0,
      sortBy = "createdAt",
      sortOrder = "desc",
      categoryId,
      brandId,
      minPrice,
      maxPrice,
      isActive,
      isFeatured,
      search,
    } = input;

    // Build dynamic WHERE clause
    const where = and(
      isActive !== undefined
        ? eq(productsSchema.isActive, isActive)
        : undefined,
      isFeatured !== undefined
        ? eq(productsSchema.isFeatured, isFeatured)
        : undefined,
      brandId ? eq(productsSchema.brandId, brandId) : undefined,
      search ? ilike(productsSchema.name, `%${search}%`) : undefined, // Simple search on name
      minPrice !== undefined
        ? sql`${productsSchema.basePrice} >= ${String(minPrice)}`
        : undefined, // Compare decimal strings
      maxPrice !== undefined
        ? sql`${productsSchema.basePrice} <= ${String(maxPrice)}`
        : undefined, // Compare decimal strings
      // Add range checks for salePrice if needed, considering nulls
      // Add category filter by joining productCategories
      categoryId
        ? eq(productCategoriesSchema.categoryId, categoryId)
        : undefined
    );

    // Build dynamic ORDER BY clause
    const orderBy =
      sortBy === "createdAt"
        ? sortOrder === "asc"
          ? asc(productsSchema.createdAt)
          : desc(productsSchema.createdAt)
        : sortBy === "price"
        ? sortOrder === "asc"
          ? asc(productsSchema.basePrice)
          : desc(productsSchema.basePrice) // Order by base price for simplicity
        : sortBy === "rating"
        ? sortOrder === "asc"
          ? asc(productsSchema.rating)
          : desc(productsSchema.rating)
        : desc(productsSchema.createdAt); // Default sort

    // Fetch products with relations needed for the list view (could be less detailed than ProductWithDetails)
    // For now, let's fetch enough to construct ProductWithDetails, but optimize if performance is an issue.
    const results = await this.db.query.products.findMany({
      // Join with productCategories if categoryId filter is applied
      ...(categoryId
        ? {
            where: and(
              where,
              eq(productCategoriesSchema.categoryId, categoryId)
            ),
            innerJoin: [productCategoriesSchema], // Use innerJoin for filtering
            // Need to filter out duplicate products caused by the join
            // This is tricky with Drizzle's findMany. A raw SQL query or
            // fetching product IDs first might be better for filtering by categories.
            // For now, assume findMany handles it or category filter is simple.
            // Let's adjust to select distinct products based on the ID.
            // This might require a different query structure or post-processing.
            // Alternative: Fetch product IDs first, then fetch products by ID.
            // Let's use a simpler approach assuming category filter works via where/join for now,
            // but be aware of potential duplicates if one product is in multiple requested categories
            // (though your schema doesn't imply filtering by *multiple* categories, just *a* categoryId).
            // Reverting to simpler where clause with category join condition directly in 'where'
            where: where, // Use the combined where clause
          }
        : {
            where: where, // Use the simple where clause if no category filter
          }),
      with: {
        brand: true,
        categories: {
          // Fetch categories even for list view
          columns: { categoryId: true },
          with: { category: { columns: { id: true, name: true, slug: true } } },
        },
        variants: true, // Fetch variants for list view too (might be too much data!)
        // Consider optimizing this for list view if performance suffers.
      },
      limit: limit,
      offset: offset,
      orderBy: [orderBy], // orderBy takes an array
    });

    // Count total products matching filters (without limit/offset)
    // Need a separate query for the count, potentially joining if categoryId is used.
    let countQueryBuilder = this.db
      .select({ count: sql<string>`count(*)` })
      .from(productsSchema);

    // Conditionally add the join if categoryId filter is present
    if (categoryId) {
      countQueryBuilder = countQueryBuilder.innerJoin(
        productCategoriesSchema,
        eq(productsSchema.id, productCategoriesSchema.productId)
      );
    }

    // Apply the same where clause to the potentially updated builder
    const countResult = await countQueryBuilder.where(where);
    const total = parseInt(countResult[0]?.count || "0", 10);

    // Process fetched results into the API output type
    const productsWithDetails: ProductWithDetails[] = [];
    for (const result of results) {
      const variantsWithProcessedAttrs = await this.processVariantAttributes(
        result.variants
      );
      const simplifiedCategories = result.categories.map((pc) => pc.category);

      productsWithDetails.push({
        ...result,
        dimensions: result.dimensions as ProductDimensions | null,
        brand: result.brand,
        categories: simplifiedCategories,
        variants: variantsWithProcessedAttrs,
        images: result.images,
        basePrice: result.basePrice,
        salePrice: result.salePrice,
        weight: result.weight,
        rating: result.rating,
      });
    }

    return { products: productsWithDetails, total: total };
  }

  /**
   * Finds a specific product variant by its ID.
   * Might fetch related product and attribute value data.
   * @param id The product variant ID.
   * @returns The product variant with details, or undefined.
   */
  async findVariantById(
    id: string
  ): Promise<ProductVariantWithDetails | undefined> {
    const result = await this.db.query.productVariants.findFirst({
      where: eq(productVariantsSchema.id, id),
      // You might want to fetch the related product here:
      // with: { product: true }
    });

    if (!result) {
      return undefined;
    }

    // Process variant attributes
    const variantsWithProcessedAttrs = await this.processVariantAttributes([
      result,
    ]);
    return variantsWithProcessedAttrs[0]; // processVariantAttributes returns an array
  }

  /**
   * Finds product and variant details needed for cart item snapshots and stock checks.
   * @param productId The product ID.
   * @param variantId Optional variant ID.
   * @returns The product and variant data.
   * @throws NotFoundError if product/variant is not found or inactive.
   */
  async getProductAndVariantForCart(
    productId: string,
    variantId?: string | null
  ): Promise<{ product: DBProduct; variant: DBProductVariant | undefined }> {
    const product = await this.db.query.products.findFirst({
      where: eq(productsSchema.id, productId),
    });

    if (!product || !product.isActive) {
      // Also check if active
      throw new NotFoundError(
        `Product with ID ${productId} not found or is inactive.`
      );
    }

    let variant: DBProductVariant | undefined = undefined;
    if (variantId) {
      variant = await this.db.query.productVariants.findFirst({
        where: and(
          eq(productVariantsSchema.id, variantId),
          eq(productVariantsSchema.productId, productId) // Ensure variant belongs to the product
        ),
      });

      if (!variant) {
        throw new NotFoundError(
          `Product variant with ID ${variantId} not found for product ${productId}.`
        );
      }
      // Note: Variants don't have an 'isActive' flag in your schema,
      // but you might want to add one or assume they are active if the product is.
    }

    // If product has variants but no variantId was provided,
    // you might want to return the default variant or throw an error.
    // Current schema doesn't have a 'isDefault' flag on variants, but could add one.
    // For now, we just return undefined variant if not provided.

    return { product, variant };
  }

  // TODO: Add methods for creating, updating, deleting products/variants if needed for admin API.
  // async createProduct(data: NewProduct): Promise<DBProduct> { ... }
  // async updateProduct(id: string, data: ProductUpdate): Promise<DBProduct | undefined> { ... }
  // async deleteProduct(id: string): Promise<void> { ... }
  // async createVariant(data: NewProductVariant): Promise<DBProductVariant> { ... }
  // async updateVariant(id: string, data: ProductVariantUpdate): Promise<DBProductVariant | undefined> { ... }
  // async deleteVariant(id: string): Promise<void> { ... }
  // async updateProductStock(id: string, quantity: number): Promise<void> { ... } // Or handle stock in service/StockModule
}

// Export an instance of the repository connected to your DB client
export const productRepository = new ProductRepository(db);
