      
// apps/server/src/api/v1/products/products.types.ts

import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import {
  products as productsSchema,
  productVariants as productVariantsSchema,
  categories as categoriesSchema,
  brands as brandsSchema,
  reviews as reviewsSchema,
  attributes as attributesSchema,
  attributeValues as attributeValuesSchema,
} from '@/db/schema/products.schema.js'; // Assuming product schemas are here

// --- Database Models (Derived from Drizzle Schema) ---
// These represent the shape of data directly from the database
export type DBProduct = InferSelectModel<typeof productsSchema>;
export type DBProductVariant = InferSelectModel<typeof productVariantsSchema>;
export type DBCategory = InferSelectModel<typeof categoriesSchema>;
export type DBBrand = InferSelectModel<typeof brandsSchema>;
export type DBReview = InferSelectModel<typeof reviewsSchema>;
export type DBAttribute = InferSelectModel<typeof attributesSchema>;
export type DBAttributeValue = InferSelectModel<typeof attributeValuesSchema>;


// --- Types for JSONB Fields ---
export interface ProductDimensions {
    length?: number;
    width?: number;
    height?: number;
}

// Raw variant attributes { attributeId: attributeValueId }
export type ProductVariantAttributes = Record<string, string>;

// Processed variant attributes { attributeName: attributeValueLabel }
// This might be used in the API response for clarity
export type ProcessedVariantAttributes = Record<string, string>;


// --- API Output Types ---
// These represent the shape of data returned by the API
// Often combines data from multiple tables and/or transforms data

// Detailed Product Variant including processed attributes
export interface ProductVariantWithDetails extends DBProductVariant {
    // Override jsonb attributes with processed type
    attributes: ProcessedVariantAttributes;
    // Optionally include attribute value details if needed, e.g., color hex code
    // attributeDetails?: { [attributeId: string]: { valueId: string, label: string, color?: string } };
}

// Product with related details (variants, brand, categories)
export interface ProductWithDetails extends DBProduct {
    // Override jsonb dimensions with typed interface
    dimensions?: ProductDimensions | null;
    // Add relationships (often fetched with Drizzle's `with`)
    brand?: DBBrand | null; // One brand
    // Simplified category list (could be DBCategory[] or a simpler structure)
    categories?: { id: string; name: string; slug: string }[];
    variants?: ProductVariantWithDetails[]; // Many variants with processed attributes
    // reviews?: DBReview[]; // Could include reviews if needed in this view
    // You might simplify the 'images' array type if needed, but string[] is fine.
    images: string[]; // Ensure this matches schema inference
    basePrice: string; // Ensure this matches schema inference
    salePrice?: string | null; // Ensure this matches schema inference
    weight?: string | null; // Ensure this matches schema inference
    rating?: string | null; // Ensure this matches schema inference
}


// --- API Input Types (for Query Parameters, Request Bodies) ---
// These often correspond to Zod schemas

// Input for listing products (query parameters)
export interface GetProductsInput {
    limit?: number;
    offset?: number;
    sortBy?: string; // e.g., 'createdAt', 'price', 'rating'
    sortOrder?: 'asc' | 'desc';
    categoryId?: string; // Filter by category
    brandId?: string; // Filter by brand
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean; // Filter by active status
    isFeatured?: boolean; // Filter by featured status
    search?: string; // Text search on name, description, sku etc.
    // Add other filter parameters as needed
}

// Input for getting a single product by slug
export interface GetProductBySlugInput {
    slug: string;
}

// Input for getting a single product by ID
export interface GetProductByIdInput {
    id: string;
}

// Define types for creating/updating products if you plan to add those endpoints
// export interface CreateProductInput { ... }
// export interface UpdateProductInput { ... }