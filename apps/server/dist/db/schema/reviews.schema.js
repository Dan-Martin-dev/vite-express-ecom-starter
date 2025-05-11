import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp, uuid, index, } from 'drizzle-orm/pg-core';
// Import related schemas for relations
import { users } from '@/db/schema/auth.schema.js';
import { products } from '@/db/schema/products.schema.js';
import { orders } from '@/db/schema/orders.schema.js';
// REVIEWS
export const reviews = pgTable('reviews', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id, { onDelete: 'cascade' }),
    orderId: uuid('order_id')
        .references(() => orders.id), // Optional link to the order
    rating: integer('rating').notNull(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    pros: text('pros'),
    cons: text('cons'),
    helpfulCount: integer('helpful_count').default(0),
    isVerifiedPurchase: boolean('is_verified_purchase').default(true),
    status: text('status').default('published'), // e.g., pending, published, rejected
    adminResponse: text('admin_response'),
    mediaUrls: text('media_urls').array(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    userIdx: index('reviews_user_id_idx').on(table.userId),
    productIdIdx: index('reviews_product_id_idx').on(table.productId),
    statusIdx: index('reviews_status_idx').on(table.status),
    createdAtIdx: index('reviews_created_at_idx').on(table.createdAt),
    // Consider composite index if needed: index('reviews_product_status_idx').on(table.productId, table.status)
}));
// RELATIONSHIPS
export const reviewsRelations = relations(reviews, ({ one }) => ({
    user: one(users, { fields: [reviews.userId], references: [users.id] }),
    product: one(products, { fields: [reviews.productId], references: [products.id] }),
    order: one(orders, { fields: [reviews.orderId], references: [orders.id] }),
}));
// Note: userRelations depends on reviews, defined in auth.schema.ts
// Note: productRelations depends on reviews, defined in products.schema.ts
// Note: ordersRelations depends on reviews, defined in orders.schema.ts
//# sourceMappingURL=reviews.schema.js.map