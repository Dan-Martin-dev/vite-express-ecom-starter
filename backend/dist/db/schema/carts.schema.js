import { relations } from 'drizzle-orm';
import { boolean, decimal, jsonb, pgTable, text, timestamp, uuid, index, } from 'drizzle-orm/pg-core';
// CARTS
export const carts = pgTable('carts', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: uuid('user_id')
        .references(() => users.id, { onDelete: 'cascade' }), // Can be null for guest carts
    sessionId: text('session_id').notNull(), // Used for guest carts or linking sessions
    items: jsonb('items').$type().default([]),
    couponCode: text('coupon_code'),
    itemsPrice: decimal('items_price', { precision: 12, scale: 2 }).notNull(),
    discountAmount: decimal('discount_amount', { precision: 12, scale: 2 }).default('0'),
    shippingPrice: decimal('shipping_price', { precision: 12, scale: 2 }).default('0'),
    taxPrice: decimal('tax_price', { precision: 12, scale: 2 }).default('0'),
    totalPrice: decimal('total_price', { precision: 12, scale: 2 }).notNull(),
    notes: text('notes'),
    shippingMethod: text('shipping_method'),
    abandonedCartEmailSent: boolean('abandoned_cart_email_sent').default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }), // For guest carts or abandoned cart cleanup
}, (table) => ({
    userIdx: index('carts_user_id_idx').on(table.userId),
    sessionIdIdx: index('carts_session_id_idx').on(table.sessionId),
    expiresAtIdx: index('carts_expires_at_idx').on(table.expiresAt),
    // Unique constraint for active user cart (optional, depends on logic)
    // uniqueUserCart: uniqueIndex('unique_user_cart_idx').on(table.userId).where(sql`expires_at IS NULL OR expires_at > now()`),
}));
// Import related schemas for relations
import { users } from './auth.schema';
// RELATIONSHIPS
export const cartsRelations = relations(carts, ({ one }) => ({
    user: one(users, { fields: [carts.userId], references: [users.id] }),
}));
// Note: userRelations depends on carts, defined in auth.schema.ts (if you add a carts relation there)
