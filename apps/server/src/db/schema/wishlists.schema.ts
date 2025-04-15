import { relations } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  index,
} from 'drizzle-orm/pg-core';

// Import related schemas for relations
import { users } from '@/db/schema/auth.schema.js';
import { products, productVariants } from '@/db/schema/products.schema.js';

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
  },
  (table) => ({
    userIdx: index('wishlists_user_id_idx').on(table.userId),
  })
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
      .references(() => productVariants.id, { onDelete: 'cascade' }), // Optional: if wishlisting specific variants
    addedAt: timestamp('added_at', { withTimezone: true }).defaultNow().notNull(),
    notes: text('notes'),
  },
  (table) => ({
    wishlistIdIdx: index('wishlist_items_wishlist_id_idx').on(table.wishlistId),
    productIdIdx: index('wishlist_items_product_id_idx').on(table.productId),
    // Consider unique constraint: uniqueIndex('unique_wishlist_product_idx').on(table.wishlistId, table.productId, table.variantId)
  })
);

// RELATIONSHIPS
export const wishlistsRelations = relations(wishlists, ({ one, many }) => ({
  user: one(users, { fields: [wishlists.userId], references: [users.id] }),
  items: many(wishlistItems),
}));

export const wishlistItemsRelations = relations(wishlistItems, ({ one }) => ({
  wishlist: one(wishlists, { fields: [wishlistItems.wishlistId], references: [wishlists.id] }),
  product: one(products, { fields: [wishlistItems.productId], references: [products.id] }),
  variant: one(productVariants, { fields: [wishlistItems.variantId], references: [productVariants.id] }),
}));

// Note: userRelations depends on wishlists, defined in auth.schema.ts
// Note: productRelations depends on wishlistItems, defined in products.schema.ts
// Note: productVariantsRelations depends on wishlistItems, defined in products.schema.ts
