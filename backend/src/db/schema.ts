import { relations } from 'drizzle-orm';
import {
  boolean,
  decimal,
  integer,
  json,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { primaryKey } from 'drizzle-orm/pg-core/primary-keys';
import { Category } from '@/types/index.js';

// Types
export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  state?: string;
  phoneNumber?: string;
  isDefault?: boolean;
};

export type PaymentResult = {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
  provider: string;
};

export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  qty: number;
  attributes?: Record<string, string>;
};



export type AdapterAccountType = 'oauth' | 'email' | 'credentials';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'user', 'staff', 'vendor']);
export const orderStatusEnum = pgEnum('order_status', [
  'pending', 
  'processing', 
  'shipped', 
  'delivered', 
  'cancelled', 
  'refunded'
]);
export const paymentStatusEnum = pgEnum('payment_status', [
  'pending', 
  'completed', 
  'failed', 
  'refunded', 
  'partially_refunded'
]);

// USERS & AUTH
export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull().default('NO_NAME'),
    email: text('email').notNull(),
    role: userRoleEnum('role').notNull().default('user'),
    password: text('password'),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    image: text('image'),
    phoneNumber: varchar('phone_number', { length: 20 }),
    bio: text('bio'),
    preferences: jsonb('preferences').default({}),
    lastLoginAt: timestamp('last_login_at'),
    addresses: jsonb('addresses').$type<ShippingAddress[]>().default([]),
    defaultPaymentMethod: text('default_payment_method'),
    marketingOptIn: boolean('marketing_opt_in').default(false),
    stripeCustomerId: text('stripe_customer_id'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      userEmailIdx: uniqueIndex('user_email_idx').on(table.email),
    }
  }
);

export const accounts = pgTable(
  'accounts',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (account) => ({
    providerPk: uniqueIndex('provider_pk').on(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  sessionToken: text('session_token').notNull().unique(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  data: jsonb('data'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// CATEGORIES
export const categories = pgTable(
  'categories',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    description: text('description'),
    image: text('image'),
    icon: text('icon'),
    metaTitle: text('meta_title'),
    metaDescription: text('meta_description'),
    parentId: uuid('parent_id'),
    displayOrder: integer('display_order').default(0),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      categorySlugIdx: uniqueIndex('category_slug_idx').on(table.slug),
    }
  }
);

// BRANDS
export const brands = pgTable(
  'brands',
  {
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
  },
  (table) => {
    return {
      brandSlugIdx: uniqueIndex('brand_slug_idx').on(table.slug),
    }
  }
);

// PRODUCTS
export const products = pgTable(
  'products',
  {
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
  },
  (table) => {
    return {
      productSlugIdx: uniqueIndex('product_slug_idx').on(table.slug),
      skuIdx: uniqueIndex('sku_idx').on(table.sku),
    }
  }
);

// Product Categories (many-to-many)
export const productCategories = pgTable(
  'product_categories',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
    isPrimary: boolean('is_primary').default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productId, table.categoryId] }),
  })
);

// ATTRIBUTES (for product variations)
export const attributes = pgTable(
  'attributes',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    description: text('description'),
    type: text('type').default('select'), // select, radio, color, etc.
    sortOrder: integer('sort_order').default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      attributeSlugIdx: uniqueIndex('attribute_slug_idx').on(table.slug),
    }
  }
);

// ATTRIBUTE VALUES
export const attributeValues = pgTable(
  'attribute_values',
  {
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
  }
);

// PRODUCT VARIANTS
export const productVariants = pgTable(
  'product_variants',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
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
  },
  (table) => {
    return {
      variantSkuIdx: uniqueIndex('variant_sku_idx').on(table.sku),
    }
  }
);

// REVIEWS
export const reviews = pgTable(
  'reviews',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    orderId: uuid('order_id')
      .references(() => orders.id),
    rating: integer('rating').notNull(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    pros: text('pros'),
    cons: text('cons'),
    helpfulCount: integer('helpful_count').default(0),
    isVerifiedPurchase: boolean('is_verified_purchase').default(true),
    status: text('status').default('published'),
    adminResponse: text('admin_response'),
    mediaUrls: text('media_urls').array(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  }
);

// CARTS
export const carts = pgTable(
  'carts',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' }),
    sessionId: text('session_id').notNull(),
    items: jsonb('items').$type<CartItem[]>().default([]),
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
    expiresAt: timestamp('expires_at', { withTimezone: true }),
  }
);

// WISHLIST
export const wishlists = pgTable(
  'wishlists',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: text('name').default('Default Wishlist'),
    isPublic: boolean('is_public').default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  }
);

export const wishlistItems = pgTable(
  'wishlist_items',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    wishlistId: uuid('wishlist_id')
      .notNull()
      .references(() => wishlists.id, { onDelete: 'cascade' }),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    variantId: uuid('variant_id')
      .references(() => productVariants.id, { onDelete: 'cascade' }),
    addedAt: timestamp('added_at', { withTimezone: true }).defaultNow().notNull(),
    notes: text('notes'),
  }
);

// COUPONS
export const coupons = pgTable(
  'coupons',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    code: text('code').notNull(),
    description: text('description'),
    discountType: text('discount_type').notNull().default('percentage'), // percentage, fixed_amount, free_shipping
    discountValue: decimal('discount_value', { precision: 12, scale: 2 }).notNull(),
    minimumSpend: decimal('minimum_spend', { precision: 12, scale: 2 }),
    maximumSpend: decimal('maximum_spend', { precision: 12, scale: 2 }),
    individualUseOnly: boolean('individual_use_only').default(false),
    excludeSaleItems: boolean('exclude_sale_items').default(false),
    usageLimit: integer('usage_limit'),
    usageLimitPerUser: integer('usage_limit_per_user'),
    usageCount: integer('usage_count').default(0),
    startDate: timestamp('start_date', { withTimezone: true }),
    endDate: timestamp('end_date', { withTimezone: true }),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      couponCodeIdx: uniqueIndex('coupon_code_idx').on(table.code),
    }
  }
);

// ORDERS
export const orders = pgTable(
  'orders',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    orderNumber: text('order_number').notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    status: orderStatusEnum('status').notNull().default('pending'),
    shippingAddress: jsonb('shipping_address').$type<ShippingAddress>().notNull(),
    billingAddress: jsonb('billing_address').$type<ShippingAddress>().notNull(),
    paymentMethod: text('payment_method').notNull(),
    paymentStatus: paymentStatusEnum('payment_status').default('pending'),
    paymentResult: jsonb('payment_result').$type<PaymentResult>(),
    couponCode: text('coupon_code'),
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
    refundStatus: text('refund_status'),
    refundAmount: decimal('refund_amount', { precision: 12, scale: 2 }),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      orderNumberIdx: uniqueIndex('order_number_idx').on(table.orderNumber),
    }
  }
);

export const orderItems = pgTable(
  'order_items',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id),
    variantId: uuid('variant_id')
      .references(() => productVariants.id),
    sku: text('sku').notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    image: text('image').notNull(),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
    discountedPrice: decimal('discounted_price', { precision: 12, scale: 2 }),
    qty: integer('qty').notNull(),
    attributes: jsonb('attributes').default({}),
    lineTotal: decimal('line_total', { precision: 12, scale: 2 }).notNull(),
    taxAmount: decimal('tax_amount', { precision: 12, scale: 2 }).default('0'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  }
);

export const orderHistory = pgTable(
  'order_history',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    status: orderStatusEnum('status').notNull(),
    comment: text('comment'),
    createdBy: uuid('created_by')
      .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  }
);

// RELATIONSHIPS
export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  orders: many(orders),
  reviews: many(reviews),
  wishlists: many(wishlists),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, { fields: [categories.parentId], references: [categories.id], relationName: 'category_parent' }),
  children: many(categories, { relationName: 'parent' }),
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

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, { fields: [productVariants.productId], references: [products.id] }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  product: one(products, { fields: [reviews.productId], references: [products.id] }),
  order: one(orders, { fields: [reviews.orderId], references: [orders.id] }),
}));

export const wishlistsRelations = relations(wishlists, ({ one, many }) => ({
  user: one(users, { fields: [wishlists.userId], references: [users.id] }),
  items: many(wishlistItems),
}));

export const wishlistItemsRelations = relations(wishlistItems, ({ one }) => ({
  wishlist: one(wishlists, { fields: [wishlistItems.wishlistId], references: [wishlists.id] }),
  product: one(products, { fields: [wishlistItems.productId], references: [products.id] }),
  variant: one(productVariants, { fields: [wishlistItems.variantId], references: [productVariants.id] }),
}));

export const cartsRelations = relations(carts, ({ one }) => ({
  user: one(users, { fields: [carts.userId], references: [users.id] }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
  history: many(orderHistory),
  reviews: many(reviews),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
  variant: one(productVariants, { fields: [orderItems.variantId], references: [productVariants.id] }),
}));

export const orderHistoryRelations = relations(orderHistory, ({ one }) => ({
  order: one(orders, { fields: [orderHistory.orderId], references: [orders.id] }),
  creator: one(users, { fields: [orderHistory.createdBy], references: [users.id] }),
}));