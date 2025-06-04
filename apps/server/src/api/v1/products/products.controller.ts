// apps/server/src/api/v1/products/products.controller.ts

import { Request, Response, NextFunction } from 'express';
import { ProductService } from "./products.service.js";
import {
/*     ProductWithDetails,
    GetProductsInput,  */
    GetProductBySlugInput, // Input type for slug handler
    GetProductByIdInput, // Input type for ID handler
} from "./products.types.js";
import { GetProductsInputSchema } from "./products.validators.js"; // <--- Import schema
// We don't import Zod schemas here, the validation middleware handles that.
// But we might import z.infer if we wanted explicit typing from schema output,
// though often the types from products.types.ts (derived from z.infer) are sufficient.
// import { z } from 'zod';
// import { GetProductsInputSchema, GetProductBySlugInputSchema, GetProductByIdInputSchema } from "./products.validators.js";


export class ProductController {
    constructor(private productService: ProductService) {}

    /**
     * Handles GET /api/v1/products requests.
     * Retrieves a list of products based on query parameters.
     */
    async getProductsHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // req.query is implicitly typed by Express, but typically validated
            // and potentially transformed by middleware. We can cast it to our
            // expected type after validation middleware has run.
            // If you use a validation middleware that places the *validated* body/query
            // onto a specific request property (e.g., req.validatedQuery), use that.
            // Assuming validateRequestBody middleware modifies req.query in place:
            const queryInput: z.infer<typeof GetProductsInputSchema> = req.query as unknown as z.infer<typeof GetProductsInputSchema>;
            // Alternatively, if using z.infer and a middleware that places the validated object somewhere:
            // const queryInput: z.infer<typeof GetProductsInputSchema> = req.validatedQuery;


            const { products, total } = await this.productService.getProducts(queryInput);

            // You might want to return total in headers or a meta object in the body
            res.status(200).json({
                data: products,
                meta: {
                    total: total,
                    limit: queryInput.limit,
                    offset: queryInput.offset,
                },
            });

        } catch (error) {
            next(error); // Pass errors to central error handler
        }
    }

     /**
     * Handles GET /api/v1/products/:slug requests.
     * Retrieves a single product by slug.
     */
     async getProductBySlugHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
         try {
             // Extract slug from path parameters
             const paramsInput: GetProductBySlugInput = { slug: req.params.slug };
              // If validating params with Zod middleware, type might be z.infer<typeof GetProductBySlugInputSchema>

             const product = await this.productService.getProductBySlug(paramsInput);

             res.status(200).json(product); // Return the single product object

         } catch (error) {
             next(error);
         }
     }

      /**
     * Handles GET /api/v1/products/:id requests (alternative route).
     * Retrieves a single product by ID.
     */
      async getProductByIdHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
         try {
             // Extract ID from path parameters
             const paramsInput: GetProductByIdInput = { id: req.params.id };
             // If validating params with Zod middleware, type might be z.infer<typeof GetProductByIdInputSchema>

             const product = await this.productService.getProductById(paramsInput);

             res.status(200).json(product); // Return the single product object

         } catch (error) {
             next(error);
         }
     }

    // TODO: Add handlers for creating, updating, deleting products if needed for admin API.
    // async createProductHandler(req: Request, res: Response, next: NextFunction): Promise<void> { ... }
    // async updateProductHandler(req: Request, res: Response, next: NextFunction): Promise<void> { ... }
    // async deleteProductHandler(req: Request, res: Response, next: NextFunction): Promise<void> { ... }

     // TODO: Add handlers for categories, brands, attributes if separate APIs are not built for them.
     // async getCategoriesHandler(req: Request, res: Response, next: NextFunction): Promise<void> { ... }
     // async getBrandsHandler(req: Request, res: Response, next: NextFunction): Promise<void> { ... }
     // async getAttributesWithValuesHandler(req: Request, res: Response, next: NextFunction): Promise<void> { ... }

}

// --- FINAL INSTANTIATION ---

// Import the productServiceInstance
import { productServiceInstance } from "./products.service.js";
import { z } from 'zod';

// Create an instance of the ProductController, injecting the ProductService instance
export const productController = new ProductController(productServiceInstance);