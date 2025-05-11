    // apps/server/src/api/v1/wishlists/wishlists.controller.ts

    import { Request, Response, NextFunction } from 'express';
    import { AppError } from "@/lib/errors/index.js"; // Import AppError (and NotFoundError if separate)
    import { WishlistService, wishlistServiceInstance } from "./wishlists.service.js"; // Import service
    import { AddItemInputSchema, RemoveItemInputSchema } from "./wishlists.validators.js"; // Import validators
    import { AddItemInput, RemoveItemInput } from './wishlists.types.js'; // Import input types
    import { validateRequestBody } from '@/middleware/validation.middleware.js'; // Assuming this path
    import { HttpError } from "@/lib/errors/HttpError.js"; // Or from index.js if it re-exports HttpError

    // Assuming your auth middleware adds user to req.user
    // declare global { namespace Express { interface Request { user?: { id: string } } } } // Or import your actual user type

    export class WishlistController {
        constructor(private wishlistService: WishlistService) {}

        /**
         * GET /api/v1/wishlists
         * Get the authenticated user's wishlist.
         */
        async getWishlistHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
            // Ensure user is authenticated and userId is available from auth middleware
            if (!req.user || !req.user.id) {
                return next(HttpError.unauthorized("User not authenticated.")); // Now this would work
            }
            const userId = req.user.id;

            try {
                const wishlist = await this.wishlistService.getWishlist(userId);
                res.status(200).json(wishlist);
            } catch (error) {
                next(error); // Pass errors to the global error handler
            }
        }

        /**
         * POST /api/v1/wishlists/items
         * Add an item to the authenticated user's wishlist.
         * Uses validateRequestBody(AddItemInputSchema) middleware.
         */
        async addItemHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
            if (!req.user || !req.user.id) {
                return next(HttpError.unauthorized("User not authenticated.")); // Now this would work

            }
            const userId = req.user.id;
            // Input is already validated by middleware and available on req.body
            const input: AddItemInput = req.body;

            try {
                const updatedWishlist = await this.wishlistService.addItem(userId, input);
                // Respond with the updated wishlist or just success status
                res.status(200).json(updatedWishlist); // 200 OK if item might have already existed, 201 Created if always new
            } catch (error) {
                // Handle specific errors from service if needed, e.g., product not found
                // The service should throw appropriate AppErrors
                next(error);
            }
        }

        /**
         * DELETE /api/v1/wishlists/items
         * Remove an item from the authenticated user's wishlist.
         * Uses validateRequestBody(RemoveItemInputSchema) middleware.
         * Identifies item by productId and optional variantId in the body.
         */
        async removeItemHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
            if (!req.user || !req.user.id) {
                return next(HttpError.unauthorized("User not authenticated.")); // Now this would work

            }
            const userId = req.user.id;
            // Input is already validated by middleware
            const input: RemoveItemInput = req.body;

            try {
                // The service should handle item not found via NotFoundError
                const updatedWishlist = await this.wishlistService.removeItem(userId, input);
                res.status(200).json(updatedWishlist); // Respond with the updated wishlist
            } catch (error) {
                next(error);
            }
        }

        /**
         * DELETE /api/v1/wishlists
         * Clear all items from the authenticated user's wishlist.
         */
        async clearWishlistHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
            if (!req.user || !req.user.id) {
                return next(HttpError.unauthorized("User not authenticated.")); // Now this would work

            }
            const userId = req.user.id;

            try {
                const clearedWishlist = await this.wishlistService.clearWishlist(userId);
                res.status(200).json(clearedWishlist); // Respond with the now empty wishlist
            } catch (error) {
                next(error);
            }
        }

        // TODO: Add method to check if an item is in the wishlist if needed
    }

    // --- FINAL INSTANTIATION ---
    // Create an instance of the WishlistController, injecting the service
    const wishlistControllerInstance = new WishlistController(wishlistServiceInstance);

    // Export the controller instance
    export { wishlistControllerInstance };