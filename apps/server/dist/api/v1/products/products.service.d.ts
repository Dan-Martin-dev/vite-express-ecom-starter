import { ProductRepository } from "./products.repository.js";
import { ProductWithDetails, DBProduct, // Import DB types if needed internally
DBProductVariant } from "./products.types.js";
import { z } from 'zod';
import { GetProductsInputSchema, GetProductBySlugInputSchema, GetProductByIdInputSchema } from "./products.validators.js";
export declare class ProductService {
    private productRepository;
    constructor(productRepository: ProductRepository);
    /**
     * Retrieves a list of products based on query parameters.
     * @param input Filter, pagination, and sorting parameters (validated by Zod).
     * @returns A promise resolving to an object containing the product list and total count.
     */
    getProducts(input: z.infer<typeof GetProductsInputSchema>): Promise<{
        products: ProductWithDetails[];
        total: number;
    }>;
    /**
     * Retrieves a single product by its unique slug.
     * @param input The slug (validated by Zod).
     * @returns A promise resolving to the product with details.
     * @throws NotFoundError if the product is not found.
     */
    getProductBySlug(input: z.infer<typeof GetProductBySlugInputSchema>): Promise<ProductWithDetails>;
    /**
     * Retrieves a single product by its unique ID.
     * @param input The ID (validated by Zod).
     * @returns A promise resolving to the product with details.
     * @throws NotFoundError if the product is not found.
     */
    getProductById(input: z.infer<typeof GetProductByIdInputSchema>): Promise<ProductWithDetails>;
    /**
     * Gets product and variant data required by the CartService (e.g., for snapshotting).
     * Includes basic checks like product existence and activity.
     * @param productId The product ID.
     * @param variantId Optional variant ID.
     * @returns Product and Variant data.
     * @throws NotFoundError if product/variant not found or inactive.
     */
    getProductDetailsForCart(productId: string, variantId?: string | null): Promise<{
        product: DBProduct;
        variant: DBProductVariant | undefined;
    }>;
}
declare const productServiceInstance: ProductService;
export { productServiceInstance };
