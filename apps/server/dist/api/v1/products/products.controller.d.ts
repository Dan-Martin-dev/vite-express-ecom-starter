import { Request, Response, NextFunction } from 'express';
import { ProductService } from "./products.service.js";
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    /**
     * Handles GET /api/v1/products requests.
     * Retrieves a list of products based on query parameters.
     */
    getProductsHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
    * Handles GET /api/v1/products/:slug requests.
    * Retrieves a single product by slug.
    */
    getProductBySlugHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
   * Handles GET /api/v1/products/:id requests (alternative route).
   * Retrieves a single product by ID.
   */
    getProductByIdHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const productController: ProductController;
