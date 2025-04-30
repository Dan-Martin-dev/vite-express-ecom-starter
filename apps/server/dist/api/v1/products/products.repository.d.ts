import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schema } from '@/db/index.js';
import { DBProduct, DBProductVariant, ProductWithDetails, // Use the type intended for API output
GetProductsInput, // Use the input type for filtering/pagination
ProductVariantWithDetails } from './products.types.js';
type DBSchema = typeof schema;
type DBClient = PostgresJsDatabase<DBSchema>;
export declare class ProductRepository {
    private db;
    constructor(db: DBClient);
    /**
     * Helper to process variant attributes from { attributeId: valueId } to { attributeName: valueLabel }.
     * This requires fetching Attribute and AttributeValue data.
     * In a real app, you might cache attribute/value names or fetch them once.
     * For simplicity here, we assume attribute/value data is available or can be fetched.
     * A more robust solution would involve joining or pre-fetching.
     */
    private processVariantAttributes;
    /**
     * Finds a single product by its ID.
     * Fetches related brand, categories, and variants.
     * @param id The product ID.
     * @returns The product with details, or undefined.
     */
    findById(id: string): Promise<ProductWithDetails | undefined>;
    /**
    * Finds a single product by its slug.
    * Fetches related brand, categories, and variants.
    * @param slug The product slug.
    * @returns The product with details, or undefined.
    */
    findBySlug(slug: string): Promise<ProductWithDetails | undefined>;
    /**
     * Finds multiple products based on filters, pagination, and sorting.
     * Might fetch limited related data for list view (e.g., main image, price, brand name).
     * @param input Filtering, pagination, and sorting parameters.
     * @returns An array of products (possibly simplified) and the total count.
     */
    findMany(input: GetProductsInput): Promise<{
        products: ProductWithDetails[];
        total: number;
    }>;
    /**
    * Finds a specific product variant by its ID.
    * Might fetch related product and attribute value data.
    * @param id The product variant ID.
    * @returns The product variant with details, or undefined.
    */
    findVariantById(id: string): Promise<ProductVariantWithDetails | undefined>;
    /**
     * Finds product and variant details needed for cart item snapshots and stock checks.
     * @param productId The product ID.
     * @param variantId Optional variant ID.
     * @returns The product and variant data.
     * @throws NotFoundError if product/variant is not found or inactive.
     */
    getProductAndVariantForCart(productId: string, variantId?: string | null): Promise<{
        product: DBProduct;
        variant: DBProductVariant | undefined;
    }>;
}
export declare const productRepository: ProductRepository;
export {};
