// apps/server/src/api/v1/wishlists/wishlists.types.ts

/* import { z } from 'zod'; */
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { wishlists, wishlistItems } from '@/db/schema/wishlists.schema.js';
import { products, productVariants } from '@/db/schema/products.schema.js';
import { db } from '@/db/index.js'; 

// --- Drizzle Schema Types ---

/** Database select model for the 'wishlists' table. */
export type DBWishlist = InferSelectModel<typeof wishlists>;

/** Database insert model for the 'wishlists' table. */
export type NewWishlist = InferInsertModel<typeof wishlists>;

/** Database select model for the 'wishlist_items' table. */
export type DBWishlistItem = InferSelectModel<typeof wishlistItems>;

/** Database insert model for the 'wishlist_items' table. */
export type NewWishlistItem = InferInsertModel<typeof wishlistItems>; // Ensure this is exported
    
/** Database select model for product (needed for relations). */
export type DBProduct = InferSelectModel<typeof products>;

/** Database select model for product variant (needed for relations). */
export type DBProductVariant = InferSelectModel<typeof productVariants>;

// --- Combined/Relation Types ---

/** Wishlist item with related product and variant details */
export type WishlistItemWithDetails = DBWishlistItem & {
    product?: DBProduct | null;
    variant?: DBProductVariant | null;
};

/** Wishlist with its items, including product/variant details on items */
export type WishlistWithItems = DBWishlist & {
    items: WishlistItemWithDetails[];
};

// FIX: Add export for WishlistWithItemsQueryResult as it's used by the service and repository
/** Type for the result of finding a wishlist with its items (can be undefined if not found) */
export type WishlistWithItemsQueryResult = WishlistWithItems | undefined;


// --- Input Types (derived from Zod validators) ---

// Placeholder types - will be inferred from validators later
export type AddItemInput = {
    productId: string;
    variantId?: string | null;
};

export type RemoveItemInput = {
    productId: string;
    variantId?: string | null;
};


// --- Repository Dependencies ---

// FIX: Define the type for the actual DB client instance
export type ActualDBClient = typeof db;

// FIX: Define the TransactionClient type using ActualDBClient. This ensures it refers to a type.
export type TransactionClient = ActualDBClient;