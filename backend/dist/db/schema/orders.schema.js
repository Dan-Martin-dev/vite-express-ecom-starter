import { relations } from 'drizzle-orm';
import { boolean, decimal, integer, jsonb, pgTable, text, timestamp, uniqueIndex, uuid, index, } from 'drizzle-orm/pg-core';
import { orderStatusEnum, paymentStatusEnum } from '../../types/index';
// ORDERS
export const orders = pgTable('orders', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    orderNumber: text('order_number').notNull(), // Consider generating this uniquely
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'restrict' }), // Restrict deletion if user has orders
    status: orderStatusEnum('status').notNull().default('pending'),
    shippingAddress: jsonb('shipping_address').$type().notNull(),
    billingAddress: jsonb('billing_address').$type().notNull(),
    paymentMethod: text('payment_method').notNull(),
    paymentStatus: paymentStatusEnum('payment_status').default('pending'),
    paymentResult: jsonb('payment_result').$type(),
    couponCode: text('coupon_code'), // Could reference coupons table later
    itemsPrice: decimal('items_price', { precision: 12, scale: 2 }).notNull(),
    discountAmount: decimal('discount_amount', { precision: 12, scale: 2 }).default('0'),
    shippingPrice: decimal('shipping_price', { precision: 12, scale: 2 }).notNull(),
    taxPrice: decimal('tax_price', { precision: 12, scale: 2 }).notNull(),
    totalPrice: decimal('total_price', { precision: 12, scale: 2 }).notNull(),
    customerNotes: text('customer_notes'),
    adminNotes: text('admin_notes'),
    isPaid: boolean('is_paid').default(false),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    isShipped: boolean('is_shipped').default(false),
    shippedAt: timestamp('shipped_at', { withTimezone: true }),
    isDelivered: boolean('is_delivered').default(false),
    deliveredAt: timestamp('delivered_at', { withTimezone: true }),
    trackingNumber: text('tracking_number'),
    shippingCarrier: text('shipping_carrier'),
    estimatedDeliveryDate: timestamp('estimated_delivery_date', { withTimezone: true }),
    refundStatus: text('refund_status'), // Could be an enum: none, partial, full
    refundAmount: decimal('refund_amount', { precision: 12, scale: 2 }),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
    return {
        orderNumberIdx: uniqueIndex('order_number_idx').on(table.orderNumber),
        userIdx: index('orders_user_id_idx').on(table.userId),
        statusIdx: index('orders_status_idx').on(table.status),
        paymentStatusIdx: index('orders_payment_status_idx').on(table.paymentStatus),
        createdAtIdx: index('orders_created_at_idx').on(table.createdAt),
        // Consider composite index if needed: index('orders_user_status_idx').on(table.userId, table.status)
    };
});
export const orderItems = pgTable('order_items', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    orderId: uuid('order_id')
        .notNull()
        .references(() => orders.id, { onDelete: 'cascade' }),
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id, { onDelete: 'set null' }), // Keep item even if product deleted? Or cascade?
    variantId: uuid('variant_id')
        .references(() => productVariants.id, { onDelete: 'set null' }), // Keep item even if variant deleted?
    sku: text('sku').notNull(), // Denormalized for easier access
    name: text('name').notNull(), // Denormalized
    slug: text('slug').notNull(), // Denormalized
    image: text('image').notNull(), // Denormalized
    price: decimal('price', { precision: 12, scale: 2 }).notNull(), // Price at time of order
    discountedPrice: decimal('discounted_price', { precision: 12, scale: 2 }), // Price after discounts applied to this item
    qty: integer('qty').notNull(),
    attributes: jsonb('attributes').default({}), // Denormalized variant attributes
    lineTotal: decimal('line_total', { precision: 12, scale: 2 }).notNull(), // qty * (discountedPrice || price)
    taxAmount: decimal('tax_amount', { precision: 12, scale: 2 }).default('0'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(), // Added for tracking when item was added
}, (table) => ({
    orderIdIdx: index('order_items_order_id_idx').on(table.orderId),
    productIdIdx: index('order_items_product_id_idx').on(table.productId),
}));
export const orderHistory = pgTable('order_history', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    orderId: uuid('order_id')
        .notNull()
        .references(() => orders.id, { onDelete: 'cascade' }),
    status: orderStatusEnum('status').notNull(),
    comment: text('comment'), // Reason for status change, notes, etc.
    createdBy: uuid('created_by') // User ID if changed by admin/system
        .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    orderIdIdx: index('order_history_order_id_idx').on(table.orderId),
    createdAtIdx: index('order_history_created_at_idx').on(table.createdAt),
}));
// RELATIONSHIPS
// Import related schemas for relations
import { users } from './auth.schema';
import { products, productVariants } from './products.schema';
import { reviews } from './reviews.schema'; // Needed for ordersRelations
export const ordersRelations = relations(orders, ({ one, many }) => ({
    user: one(users, { fields: [orders.userId], references: [users.id] }),
    items: many(orderItems),
    history: many(orderHistory),
    reviews: many(reviews), // Reviews associated with this order
}));
export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
    product: one(products, { fields: [orderItems.productId], references: [products.id] }),
    variant: one(productVariants, { fields: [orderItems.variantId], references: [productVariants.id] }),
}));
export const orderHistoryRelations = relations(orderHistory, ({ one }) => ({
    order: one(orders, { fields: [orderHistory.orderId], references: [orders.id] }),
    creator: one(users, { fields: [orderHistory.createdBy], references: [users.id] }), // Link to the user who created the history entry
}));
// Note: userRelations depends on orders, defined in auth.schema.ts
// Note: reviewsRelations depends on orders, defined in reviews.schema.ts
// Note: productRelations depends on orderItems, defined in products.schema.ts
// Note: productVariantsRelations depends on orderItems, defined in products.schema.ts
