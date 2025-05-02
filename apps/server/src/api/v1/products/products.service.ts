// apps/server/src/api/v1/products/products.service.ts

import { ProductRepository } from "./products.repository.js";
import {
    ProductWithDetails,
    GetProductsInput,
    GetProductBySlugInput,
    GetProductByIdInput,
    DBProduct, // Import DB types if needed internally
    DBProductVariant,
} from "./products.types.js";
import { NotFoundError } from "@/lib/errors/NotFoundError.js";
import { AppError } from "@/lib/errors/AppError.js";

// Import Zod infer utility and schemas for input typing
import { z } from 'zod';
import { GetProductsInputSchema, GetProductBySlugInputSchema, GetProductByIdInputSchema } from "./products.validators.js";

// --- Services this module might depend on ---
// import { StockService } from '@/features/stock/stock.service'; // For centralized stock management
// import { ReviewService } from '@/features/reviews/review.service'; // If product service fetches reviews

export class ProductService {
    constructor(
        private productRepository: ProductRepository,
        // private stockService: StockService, // Inject if stock is separate
        // private reviewService: ReviewService, // Inject if fetching reviews here
    ) {}

    /**
     * Retrieves a list of products based on query parameters.
     * @param input Filter, pagination, and sorting parameters (validated by Zod).
     * @returns A promise resolving to an object containing the product list and total count.
     */
    async getProducts(input: z.infer<typeof GetProductsInputSchema>): Promise<{ products: ProductWithDetails[]; total: number }> {
        // The repository handles the heavy lifting of querying, filtering, sorting, and fetching basic relations.
        const { products, total } = await this.productRepository.findMany(input);

        // If findMany in repo doesn't fetch all details needed for ProductWithDetails
        // (e.g., processed variant attributes, full categories), you'd do that here.
        // However, the current repo implementation *does* fetch and process these,
        // so we might just return the result directly.

        // Example: If you needed to fetch reviews separately for each product
        // for (const product of products) {
        //     product.reviews = await this.reviewService.getReviewsForProduct(product.id);
        // }

        return { products, total };
    }

    /**
     * Retrieves a single product by its unique slug.
     * @param input The slug (validated by Zod).
     * @returns A promise resolving to the product with details.
     * @throws NotFoundError if the product is not found.
     */
    async getProductBySlug(input: z.infer<typeof GetProductBySlugInputSchema>): Promise<ProductWithDetails> {
        const product = await this.productRepository.findBySlug(input.slug);

        if (!product) {
            throw new NotFoundError(`Product with slug "${input.slug}" not found.`);
        }

        // If findBySlug in repo doesn't fetch all details needed for ProductWithDetails,
        // (e.g., processed variant attributes, full categories), you'd do that here.
        // Currently, the repo handles this.

         // Example: If you needed to fetch reviews for this single product
        // product.reviews = await this.reviewService.getReviewsForProduct(product.id);


        return product;
    }

    /**
     * Retrieves a single product by its unique ID.
     * @param input The ID (validated by Zod).
     * @returns A promise resolving to the product with details.
     * @throws NotFoundError if the product is not found.
     */
    async getProductById(input: z.infer<typeof GetProductByIdInputSchema>): Promise<ProductWithDetails> {
        const product = await this.productRepository.findById(input.id);

        if (!product) {
            throw new NotFoundError(`Product with ID "${input.id}" not found.`);
        }

         // If findById in repo doesn't fetch all details needed for ProductWithDetails,
        // (e.g., processed variant attributes, full categories), you'd do that here.
        // Currently, the repo handles this.

        // Example: If you needed to fetch reviews for this single product
        // product.reviews = await this.reviewService.getReviewsForProduct(product.id);

        return product;
    }

     /**
      * Gets product and variant data required by the CartService (e.g., for snapshotting).
      * Includes basic checks like product existence and activity.
      * @param productId The product ID.
      * @param variantId Optional variant ID.
      * @returns Product and Variant data.
      * @throws NotFoundError if product/variant not found or inactive.
      */
     async getProductDetailsForCart(productId: string, variantId?: string | null): Promise<{ product: DBProduct, variant: DBProductVariant | undefined }> {
         // Use the dedicated repository method which includes basic checks
         return this.productRepository.getProductAndVariantForCart(productId, variantId);
     }

    // TODO: Add methods for creating, updating, deleting products/variants if needed for admin API.
    // async createProduct(data: z.infer<typeof CreateProductInputSchema>): Promise<ProductWithDetails> { ... }
    // async updateProduct(id: string, data: z.infer<typeof UpdateProductInputSchema>): Promise<ProductWithDetails> { ... }
    // async deleteProduct(id: string): Promise<void> { ... }
    // async createVariant(productId: string, data: NewProductVariant): Promise<ProductVariantWithDetails> { ... }
    // async updateVariant(variantId: string, data: ProductVariantUpdate): Promise<ProductVariantWithDetails | undefined> { ... }
    // async deleteVariant(variantId: string): Promise<void> { ... }

     // TODO: Need methods related to categories, brands, attributes if separate APIs are not built for them.
     // async getCategories(): Promise<DBCategory[]> { ... }
     // async getBrands(): Promise<DBBrand[]> { ... }
     // async getAttributesWithValues(): Promise<DBAttribute[]> { ... }
}

// --- FINAL INSTANTIATION ---

// Import the Drizzle DB client instance
import { db } from '@/db/index.js'; // Adjust path if necessary

// Create an instance of the ProductRepository, injecting the DB client
const productRepositoryInstance = new ProductRepository(db);

// Create an instance of the ProductService, injecting the repository
// Inject other dependencies like StockService, ReviewService here if needed
const productServiceInstance = new ProductService(productRepositoryInstance);

// Export the service instance
export { productServiceInstance };