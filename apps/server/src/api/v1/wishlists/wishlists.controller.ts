    // apps/server/src/api/v1/wishlists/wishlists.controller.ts

/*     import { AppError } from "@/lib/errors/index.js"; 
    import { AddItemInputSchema, RemoveItemInputSchema } from "./wishlists.validators.js"; 
    import { validateRequestBody } from '@/middleware/validation.middleware.js';  */
    import { HttpError } from "@/lib/errors/HttpError.js"; 
    import { WishlistService, wishlistServiceInstance } from "./wishlists.service.js"; 
    import { AddItemInput, RemoveItemInput } from './wishlists.types.js'; 
    import { Request, Response, NextFunction } from 'express';

   
    export class WishlistController {
        constructor(private wishlistService: WishlistService) {}

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

    }

    const wishlistControllerInstance = new WishlistController(wishlistServiceInstance);

    export { wishlistControllerInstance };