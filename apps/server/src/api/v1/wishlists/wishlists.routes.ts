// apps/server/src/api/v1/wishlists/wishlists.routes.ts

import { Router } from 'express';
import { wishlistControllerInstance } from './wishlists.controller.js'; // Import controller instance
import { validateRequestBody } from '@/middleware/validation.middleware.js'; // Import validation middleware
import { AddItemInputSchema, RemoveItemInputSchema } from './wishlists.validators.js'; // Import validators
// Assuming you have an auth middleware that adds req.user
import { isAuthenticated } from '@/middleware/auth.middleware.js'; // Example auth middleware import

const router = Router();

// All wishlist routes require authentication
// Apply middleware to all routes in this router
router.use(isAuthenticated);

// GET user's wishlist
router.get('/', wishlistControllerInstance.getWishlistHandler);

// POST add item to wishlist
router.post(
    '/items',
    validateRequestBody(AddItemInputSchema), // Validate request body
    wishlistControllerInstance.addItemHandler
);

// DELETE remove item from wishlist
// Using POST body for item identification for consistency with add,
// alternatively could use DELETE with params (e.g., /items/:productId/:variantId?)
router.delete(
    '/items',
    validateRequestBody(RemoveItemInputSchema), // Validate request body
    wishlistControllerInstance.removeItemHandler
);

// DELETE clear entire wishlist
router.delete('/', wishlistControllerInstance.clearWishlistHandler);

// TODO: Add a route for checking if an item is in the wishlist (e.g., GET /items/check?productId=...&variantId=...)

export default router;