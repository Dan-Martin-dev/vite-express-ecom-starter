// apps/server/src/api/v1/wishlists/wishlists.service.ts

/* import { z } from 'zod'; 
import { db } from '@/db/index.js'; 
import { AddItemInputSchema, RemoveItemInputSchema } from "./wishlists.validators.js"; 
*/
import { AppError, NotFoundError } from "@/lib/errors/index.js";
import { WishlistRepository, wishlistRepositoryInstance } from "./wishlists.repository.js";
import { ProductService, productServiceInstance } from '@/api/v1/products/products.service.js'; 
import { AddItemInput, NewWishlistItem, RemoveItemInput, WishlistWithItemsQueryResult } from './wishlists.types.js'; 

// Assuming NotFoundError exists, otherwise use new AppError('Not Found', 404)
// If NotFoundError is not in lib/errors, you might need to create it
// e.g., class NotFoundError extends AppError { constructor(message: string) { super(message, 404); } }

export class WishlistService {
    constructor(
        // Inject dependencies
        private wishlistRepository: WishlistRepository,
        private productService: ProductService // Need ProductService to validate product existence
    ) {}

    /**
     * Gets or creates a wishlist for the given user.
     * @param userId The ID of the user.
     * @returns The user's wishlist with items.
     */
    async getWishlist(userId: string): Promise<WishlistWithItemsQueryResult> {
        let wishlist = await this.wishlistRepository.findWishlistByUserId(userId);

        if (!wishlist) {
            /*  const newWishlist = await this.wishlistRepository.createWishlist(userId); */
             wishlist = await this.wishlistRepository.findWishlistByUserId(userId);
             if (!wishlist) {
                 throw new AppError("Failed to retrieve newly created wishlist.", 500);
             }
        }

        return wishlist;
    }

    /**
     * Adds a product/variant to the user's wishlist.
     * Creates the wishlist if it doesn't exist.
     * If the item is already in the wishlist, no action is taken (or return the existing item).
     * @param userId The ID of the user.
     * @param input Validated input containing productId and optional variantId.
     * @returns The newly added or existing wishlist item.
     * @throws NotFoundError if the product/variant does not exist or is inactive.
     * @throws AppError for other unexpected issues.
     */
    async addItem(userId: string, input: AddItemInput): Promise<WishlistWithItemsQueryResult | undefined> {
        const { productId, variantId = null } = input; // Default variantId to null if not provided

        // 1. Ensure product/variant exists and is active (uses ProductService)
        try {
             // We only need to know if it's valid and fetch minimal details if needed for the item.
             // Assuming getProductDetailsForCart throws if not found/inactive
             await this.productService.getProductDetailsForCart(productId, variantId);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new NotFoundError("Product or variant not found or is inactive.");
            }
             // Re-throw other errors from productService
             throw error;
        }

        // 2. Get or create the user's wishlist
        let wishlistId: string;
        const existingWishlist = await this.wishlistRepository.findWishlistByUserId(userId);
        
        if (!existingWishlist) {

            const newWishlist = await this.wishlistRepository.createWishlist(userId);
            if (!newWishlist) {
                // Handle case where creation might fail unexpectedly, though unlikely if find failed
                 throw new Error("Failed to create wishlist.");
            }
             // Assign the ID from the newly created basic wishlist object
             wishlistId = newWishlist.id;
        }  
        else {
            // Assign the ID from the existing full wishlist object
           wishlistId = existingWishlist.id;
       }

        // 3. Check if the item is already in the wishlist
        const existingItem = await this.wishlistRepository.findWishlistItemByProductAndVariant(
             userId, // Pass userId to query via wishlist relation
             productId,
             variantId
        );

        if (existingItem) {
            // Item already exists, no need to add again.
            // You could return the existing item or null/undefined,
            // or throw a specific error if adding existing items is an error condition.
            // Returning the full wishlist after adding seems more useful for a refresh.
             // Let's re-fetch the wishlist after confirming existence/adding
        } else {
             // 4. If item does not exist, add it
             const newItemData: Omit<NewWishlistItem, 'wishlistId'> = {
                 productId: productId,
                 variantId: variantId,
                 // createdAt will be defaulted by Drizzle
             };
             await this.wishlistRepository.addWishlistItem(wishlistId, newItemData);
        }

        // 5. Re-fetch the wishlist with the added item to return the latest state
        // This might be slightly less performant than just returning the new item,
        // but ensures the client gets the updated list structure.
        return this.wishlistRepository.findWishlistByUserId(userId); // Return the updated wishlist


    }

    /**
     * Removes an item from the user's wishlist.
     * @param userId The ID of the user.
     * @param input Validated input containing productId and optional variantId.
     * @returns The removed wishlist item or undefined if not found.
     * @throws NotFoundError if the wishlist or item is not found for the user.
     */
    async removeItem(userId: string, input: RemoveItemInput): Promise<WishlistWithItemsQueryResult | undefined> {
         const { productId, variantId = null } = input;

         // 1. Find the specific item to remove, ensuring it belongs to the user's wishlist
         const itemToRemove = await this.wishlistRepository.findWishlistItemByProductAndVariant(
              userId, // Pass userId to query via wishlist relation
              productId,
              variantId
         );

         if (!itemToRemove) {
              // Item not found in the user's wishlist
              throw new NotFoundError("Wishlist item not found.");
         }

         // 2. Remove the item by its ID
         await this.wishlistRepository.removeWishlistItemById(itemToRemove.id);

         // 3. Re-fetch the wishlist to return the latest state
         return this.wishlistRepository.findWishlistByUserId(userId);
    }


    /**
     * Clears all items from the user's wishlist.
     * @param userId The ID of the user.
     * @returns The cleared wishlist (with an empty items array).
     * @throws NotFoundError if the user's wishlist does not exist.
     */
    async clearWishlist(userId: string): Promise<WishlistWithItemsQueryResult> {
         // 1. Get the user's wishlist
         const wishlist = await this.wishlistRepository.findWishlistByUserId(userId);

         if (!wishlist) {
             // If no wishlist exists, it's already "clear" in a sense,
             // but maybe we should still return an empty list structure or throw.
             // Throwing NotFoundError might be better if the user requests to clear something that doesn't exist.
              // Or just create one and clear? Let's create one if not exists and then clear its (empty) items.
              // Or just find it, and if exists, clear its items.
              // Let's find it, and if it exists, clear its items. If not, return an empty structure.
              // A simple approach: if no wishlist, return the empty list structure (conceptually).
              // But the requirement is "clearing", implies existence. Let's throw if not found.
             throw new NotFoundError("Wishlist not found for user.");
         }

         // 2. Clear all items from the wishlist
         await this.wishlistRepository.clearWishlistItems(wishlist.id);

         // 3. Re-fetch the wishlist to return the latest state (should have items: [])
         return this.wishlistRepository.findWishlistByUserId(userId);
    }


    // TODO: Add other methods like checkIfItemInWishlist
}

// --- FINAL INSTANTIATION ---
// Import instances of dependencies
// Import ProductService instance

// Create an instance of the WishlistService, injecting dependencies
const wishlistServiceInstance = new WishlistService(
    wishlistRepositoryInstance, // Pass WishlistRepository instance
    productServiceInstance // Pass ProductService instance
);

// Export the service instance
export { wishlistServiceInstance };