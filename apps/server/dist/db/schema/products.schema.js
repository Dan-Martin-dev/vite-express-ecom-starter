// apps/server/src/db/schema/products.schema.ts
import { relations } from 'drizzle-orm';
import { boolean, decimal, integer, jsonb, pgTable, text, timestamp, uniqueIndex, uuid, index, } from 'drizzle-orm/pg-core';
import { primaryKey } from 'drizzle-orm/pg-core/primary-keys';
// Import related schemas for relations
import { reviews } from '../../db/schema/reviews.schema.js';
import { orderItems } from '../../db/schema/orders.schema.js';
import { wishlistItems } from '../../db/schema/wishlists.schema.js';
// CATEGORIES
export const categories = pgTable('categories', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    description: text('description'),
    image: text('image'),
    icon: text('icon'),
    metaTitle: text('meta_title'),
    metaDescription: text('meta_description'),
    parentId: uuid('parent_id'), // Self-referencing foreign key
    displayOrder: integer('display_order').default(0),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
    return {
        categorySlugIdx: uniqueIndex('category_slug_idx').on(table.slug),
        parentIdIdx: index('categories_parent_id_idx').on(table.parentId),
        isActiveIdx: index('categories_is_active_idx').on(table.isActive),
    };
});
// BRANDS
export const brands = pgTable('brands', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    logo: text('logo'),
    description: text('description'),
    website: text('website'),
    isFeatured: boolean('is_featured').default(false),
    metaTitle: text('meta_title'),
    metaDescription: text('meta_description'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
    return {
        brandSlugIdx: uniqueIndex('brand_slug_idx').on(table.slug),
    };
});
// PRODUCTS
export const products = pgTable('products', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    brandId: uuid('brand_id')
        .references(() => brands.id, { onDelete: 'set null' }),
    description: text('description').notNull(),
    shortDescription: text('short_description'),
    images: text('images').array().notNull(),
    basePrice: decimal('base_price', { precision: 12, scale: 2 }).notNull().default('0'),
    salePrice: decimal('sale_price', { precision: 12, scale: 2 }),
    sku: text('sku'),
    barcode: text('barcode'),
    weight: decimal('weight', { precision: 7, scale: 2 }),
    dimensions: jsonb('dimensions').default({}), // {length, width, height}
    taxClass: text('tax_class').default('standard'),
    stockManagement: boolean('stock_management').default(true),
    stock: integer('stock').default(0),
    lowStockThreshold: integer('low_stock_threshold').default(5),
    soldIndividually: boolean('sold_individually').default(false),
    backordersAllowed: boolean('backorders_allowed').default(false),
    rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
    numReviews: integer('num_reviews').default(0),
    metaTitle: text('meta_title'),
    metaDescription: text('meta_description'),
    metaKeywords: text('meta_keywords'),
    isFeatured: boolean('is_featured').default(false).notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    hasVariants: boolean('has_variants').default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    publishedAt: timestamp('published_at', { withTimezone: true }),
}, (table) => {
    return {
        productSlugIdx: uniqueIndex('product_slug_idx').on(table.slug),
        skuIdx: uniqueIndex('sku_idx').on(table.sku),
        brandIdIdx: index('products_brand_id_idx').on(table.brandId),
        isActiveIdx: index('products_is_active_idx').on(table.isActive),
        isFeaturedIdx: index('products_is_featured_idx').on(table.isFeatured),
        createdAtIdx: index('products_created_at_idx').on(table.createdAt),
    };
});
// Product Categories (many-to-many)
export const productCategories = pgTable('product_categories', {
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id, { onDelete: 'cascade' }),
    categoryId: uuid('category_id')
        .notNull()
        .references(() => categories.id, { onDelete: 'cascade' }),
    isPrimary: boolean('is_primary').default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.productId, table.categoryId] }),
    productIdIdx: index('product_categories_product_id_idx').on(table.productId),
    categoryIdIdx: index('product_categories_category_id_idx').on(table.categoryId),
}));
// ATTRIBUTES (for product variations)
export const attributes = pgTable('attributes', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    description: text('description'),
    type: text('type').default('select'), // select, radio, color, etc.
    sortOrder: integer('sort_order').default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
    return {
        attributeSlugIdx: uniqueIndex('attribute_slug_idx').on(table.slug),
    };
});
// ATTRIBUTE VALUES
export const attributeValues = pgTable('attribute_values', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    attributeId: uuid('attribute_id')
        .notNull()
        .references(() => attributes.id, { onDelete: 'cascade' }),
    value: text('value').notNull(),
    label: text('label').notNull(),
    color: text('color'),
    image: text('image'),
    sortOrder: integer('sort_order').default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    attributeIdIdx: index('attribute_values_attribute_id_idx').on(table.attributeId),
}));
// PRODUCT VARIANTS
export const productVariants = pgTable('product_variants', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    slug: text('slug'),
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id, { onDelete: 'cascade' }),
    sku: text('sku'),
    barcode: text('barcode'),
    price: decimal('price', { precision: 12, scale: 2 }),
    salePrice: decimal('sale_price', { precision: 12, scale: 2 }),
    stock: integer('stock').default(0),
    weight: decimal('weight', { precision: 7, scale: 2 }),
    dimensions: jsonb('dimensions'),
    image: text('image'),
    isDefault: boolean('is_default').default(false),
    attributes: jsonb('attributes').notNull(), // {attributeId: valueId, ...}
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
    return {
        variantSkuIdx: uniqueIndex('variant_sku_idx').on(table.sku),
        productIdIdx: index('product_variants_product_id_idx').on(table.productId),
    };
});
// RELATIONSHIPS
export const categoriesRelations = relations(categories, ({ one, many }) => ({
    parent: one(categories, { fields: [categories.parentId], references: [categories.id], relationName: 'category_parent' }),
    children: many(categories, { relationName: 'category_parent' }), // Corrected relationName
    productCategories: many(productCategories),
}));
export const brandsRelations = relations(brands, ({ many }) => ({
    products: many(products),
}));
export const productRelations = relations(products, ({ one, many }) => ({
    brand: one(brands, { fields: [products.brandId], references: [brands.id] }),
    categories: many(productCategories),
    variants: many(productVariants),
    reviews: many(reviews),
    orderItems: many(orderItems),
    wishlistItems: many(wishlistItems),
}));
export const productCategoriesRelations = relations(productCategories, ({ one }) => ({
    product: one(products, { fields: [productCategories.productId], references: [products.id] }),
    category: one(categories, { fields: [productCategories.categoryId], references: [categories.id] }),
}));
export const attributesRelations = relations(attributes, ({ many }) => ({
    values: many(attributeValues),
}));
export const attributeValuesRelations = relations(attributeValues, ({ one }) => ({
    attribute: one(attributes, { fields: [attributeValues.attributeId], references: [attributes.id] }),
}));
export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
    product: one(products, { fields: [productVariants.productId], references: [products.id] }),
    orderItems: many(orderItems), // Relation needed if orderItems references variantId
    wishlistItems: many(wishlistItems), // Relation needed if wishlistItems references variantId
}));
// Note: reviewsRelations depends on products, defined in reviews.schema.ts
// Note: wishlistItemsRelations depends on products/variants, defined in wishlists.schema.ts
// Note: orderItemsRelations depends on products/variants, defined in orders.schema.ts
//# sourceMappingURL=products.schema.js.map