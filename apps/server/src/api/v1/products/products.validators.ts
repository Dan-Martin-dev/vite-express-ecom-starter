      
// apps/server/src/api/v1/products/products.validators.ts

import { z } from 'zod';
import {
    GetProductsInput, // Input type for listing products
    GetProductBySlugInput, // Input type for getting by slug
    GetProductByIdInput, // Input type for getting by id
    // Add types for Create/Update Product Input if needed later
    // CreateProductInput,
    // UpdateProductInput,
} from './products.types.js'; // Import types from this module

// Schema for validating query parameters for the product list endpoint (GET /api/v1/products)
export const GetProductsInputSchema = z.object({
    limit: z.coerce.number().int().positive().optional().default(10), // Coerce to number, default 10
    offset: z.coerce.number().int().nonnegative().optional().default(0), // Coerce to number, default 0
    sortBy: z.enum(['createdAt', 'price', 'rating', 'name']).optional().default('createdAt'), // Allowed sort fields
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'), // Allowed sort order
    categoryId: z.string().uuid("Invalid category ID format.").optional(), // Filter by category
    brandId: z.string().uuid("Invalid brand ID format.").optional(), // Filter by brand
    minPrice: z.coerce.number().positive("Minimum price must be a positive number.").optional(), // Filter by price range (coerce to number)
    maxPrice: z.coerce.number().positive("Maximum price must be a positive number.").optional(),
    isActive: z.coerce.boolean().optional(), // Filter by active status (coerce boolean from query string 'true'/'false')
    isFeatured: z.coerce.boolean().optional(), // Filter by featured status
    search: z.string().min(1, "Search query cannot be empty.").optional(), // Text search

     // Ensure minPrice is not greater than maxPrice if both are provided
}).refine(data => {
    if (data.minPrice !== undefined && data.maxPrice !== undefined) {
        return data.minPrice <= data.maxPrice;
    }
    return true; // No validation needed if one or both are missing
}, {
    message: "Minimum price cannot be greater than maximum price.",
    path: ['minPrice', 'maxPrice'], // Point to both fields in the error
}) satisfies z.ZodSchema<GetProductsInput>; // Validate against the TypeScript input type


// Schema for validating the slug parameter (used in routes like GET /api/v1/products/:slug)
// Often params are validated separately or in the controller, but defining the schema is useful.
export const GetProductBySlugInputSchema = z.object({
    slug: z.string().min(1, "Slug cannot be empty."), // Basic validation for a slug
    // Add format validation if slugs follow a specific pattern (e.g., /[a-z0-9-]+/)
}) satisfies z.ZodSchema<GetProductBySlugInput>;

// Schema for validating the ID parameter (used in routes like GET /api/v1/products/:id)
export const GetProductByIdInputSchema = z.object({
    id: z.string().uuid("Invalid product ID format."), // Validate UUID format for ID
}) satisfies z.ZodSchema<GetProductByIdInput>;

// TODO: Add schemas for creating/updating products if needed later
/*
export const CreateProductInputSchema = z.object({
    // Define schema for product creation fields
    name: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9-]+$/, "Invalid slug format."),
    brandId: z.string().uuid().optional().nullable(),
    description: z.string().min(1),
    shortDescription: z.string().optional().nullable(),
    images: z.string().url().array().min(1, "At least one image is required."), // Array of image URLs
    basePrice: z.coerce.number().positive("Base price must be positive."),
    salePrice: z.coerce.number().positive().optional().nullable(),
    sku: z.string().optional().nullable(), // Optional/nullable SKU
    // Add other fields...
    stockManagement: z.boolean().default(true),
    stock: z.number().int().nonnegative().default(0),
    lowStockThreshold: z.number().int().nonnegative().default(5),
    isActive: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
    hasVariants: z.boolean().default(false),
    categoryIds: z.string().uuid().array().min(1, "At least one category is required."), // Array of category IDs
    // Variants would likely be a separate endpoint or a complex nested schema here
}); // satisfies z.ZodSchema<CreateProductInput>; // Match to your TypeScript Input type

export const UpdateProductInputSchema = CreateProductInputSchema.partial().extend({
     // When updating, ID is usually in params, but if in body, add it here
     id: z.string().uuid().optional(),
     // Define how partial updates are handled
}); // satisfies z.ZodSchema<UpdateProductInput>;
*/

    