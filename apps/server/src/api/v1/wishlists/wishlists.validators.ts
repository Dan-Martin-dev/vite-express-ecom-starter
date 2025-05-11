// apps/server/src/api/v1/wishlists/wishlists.validators.ts

import { z } from 'zod';
    
// Zod schema for adding an item to the wishlist
export const AddItemInputSchema = z.object({
    productId: z.string().uuid({ message: "Invalid productId format" }),
    variantId: z.string().uuid({ message: "Invalid variantId format" }).nullable().optional(), // Allow null or undefined
});

// Zod schema for removing an item from the wishlist
// We'll use the same structure as adding for easy identification
export const RemoveItemInputSchema = z.object({
    productId: z.string().uuid({ message: "Invalid productId format" }),
    variantId: z.string().uuid({ message: "Invalid variantId format" }).nullable().optional(),
});

// Optional: Schema for fetching a wishlist (e.g., with query params for pagination/sorting later)
// export const GetWishlistQueryParamsSchema = z.object({
//     page: z.coerce.number().int().positive().optional().default(1),
//     limit: z.coerce.number().int().positive().optional().default(10),
// });              