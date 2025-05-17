// apps/server/src/api/v1/products/products.routes.ts

import { Router } from 'express';
import express, { Request, Response, NextFunction } from 'express';
import { productController } from "./products.controller.js";
import { validateRequestBody, validateQueryParams } from '@/middleware/validation.middleware.js'; // Assuming validation middleware handles query/body separately
// import { authenticate } from '@/middleware/auth.middleware.js'; // Add if product routes require authentication

import {
    GetProductsInputSchema, // Schema for list query params
    GetProductBySlugInputSchema, // Schema for slug param (optional validation)
    GetProductByIdInputSchema, // Schema for ID param (optional validation)
    // Add schemas for Create/Update Product Input if needed later
    // CreateProductInputSchema,
    // UpdateProductInputSchema,
} from "./products.validators.js";


const router: Router = express.Router(); // <-- Add the explicit ': Router' annotation

// Apply authentication middleware if needed for specific routes or all routes
// router.use(authenticate);

// GET /api/v1/products - Get a list of products
// Use validateQueryParams middleware here
router.get(
    '/',
    validateQueryParams(GetProductsInputSchema), // Validate query parameters
    productController.getProductsHandler
);

// GET /api/v1/products/:slug - Get a single product by slug
// Params validation can be done here or in the controller
router.get(
    '/:slug',
    // Optional: validateParams(GetProductBySlugInputSchema), // If you have params validation middleware
    productController.getProductBySlugHandler
);

// GET /api/v1/products/:id - Get a single product by ID (alternative route)
router.get(
     '/:id',
     // Optional: validateParams(GetProductByIdInputSchema), // If you have params validation middleware
     productController.getProductByIdHandler
);


// TODO: Add POST/PUT/DELETE routes for creating/updating/deleting products if needed for admin API.
/*
router.post(
    '/',
    authenticate('admin'), // Example: require admin auth
    validateRequestBody(CreateProductInputSchema),
    productController.createProductHandler
);

router.put(
    '/:id',
    authenticate('admin'), // Example: require admin auth
    validateRequestBody(UpdateProductInputSchema), // Using Update schema
    // Optional: validateParams(GetProductByIdInputSchema), // Validate ID param
    productController.updateProductHandler
);

router.delete(
    '/:id',
    authenticate('admin'), // Example: require admin auth
    // Optional: validateParams(GetProductByIdInputSchema), // Validate ID param
    productController.deleteProductHandler
);
*/

// TODO: Add routes for categories, brands, attributes if separate APIs are not built for them.
/*
router.get('/categories', productController.getCategoriesHandler);
router.get('/brands', productController.getBrandsHandler);
router.get('/attributes', productController.getAttributesWithValuesHandler);
*/

export default router;