import { InferSelectModel } from 'drizzle-orm';
import { products as productsSchema, productVariants as productVariantsSchema, categories as categoriesSchema, brands as brandsSchema, attributes as attributesSchema, attributeValues as attributeValuesSchema } from '@/db/schema/products.schema.js';
export type DBProduct = InferSelectModel<typeof productsSchema>;
export type DBProductVariant = InferSelectModel<typeof productVariantsSchema>;
export type DBCategory = InferSelectModel<typeof categoriesSchema>;
export type DBBrand = InferSelectModel<typeof brandsSchema>;
export type DBAttribute = InferSelectModel<typeof attributesSchema>;
export type DBAttributeValue = InferSelectModel<typeof attributeValuesSchema>;
export interface ProductDimensions {
    length?: number;
    width?: number;
    height?: number;
}
export type ProductVariantAttributes = Record<string, string>;
export type ProcessedVariantAttributes = Record<string, string>;
export interface ProductVariantWithDetails extends DBProductVariant {
    attributes: ProcessedVariantAttributes;
}
export interface ProductWithDetails extends DBProduct {
    dimensions: ProductDimensions | null;
    brand?: DBBrand | null;
    categories?: {
        id: string;
        name: string;
        slug: string;
    }[];
    variants?: ProductVariantWithDetails[];
}
export interface GetProductsInput {
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    categoryId?: string;
    brandId?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
    isFeatured?: boolean;
    search?: string;
}
export interface GetProductBySlugInput {
    slug: string;
}
export interface GetProductByIdInput {
    id: string;
}
