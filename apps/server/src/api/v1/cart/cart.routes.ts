// cart.routes.ts
import { Router } from 'express';
import { cartController } from './cart.controller.js';
import { validateRequestBody } from '@/middleware/validation.middleware.js'; // Assuming your validation middleware
import { isAuthenticated } from '@/middleware/auth.middleware.js'; // Assuming your auth middleware
import { requireSessionId } from '@/middleware/session.middleware.js'; // <-- You'll need to create this middleware
import express from 'express';

import {
  AddItemToCartInputSchema,
  UpdateCartItemInputSchema,
  RemoveItemFromCartInputSchema,
  ApplyCouponInputSchema,
  UpdateCartDetailsInputSchema
} from './cart.validators.js';

const router: Router = express.Router(); // Or const v1Router: Router = ...;

// Apply session middleware to all cart routes
// This middleware should attach a unique sessionId (e.g., UUID) to req.sessionId
// If the user is logged in, the auth middleware will also attach req.user
router.use(requireSessionId);
// Optional: Apply auth middleware if all cart operations require a user (less common for e-commerce carts)
// router.use(authenticate); // Cart operations often work for guests

// GET /api/v1/cart - Get the current user's or session's cart
// This route can work for both authenticated users (usi  ng req.user) and guests (using req.sessionId)
router.get('/', cartController.getUserCart);

// POST /api/v1/cart/items - Add item to the current cart
router.post(
  '/items',
  validateRequestBody(AddItemToCartInputSchema),
  cartController.addItemToCart
);

// PUT /api/v1/cart/items - Update item quantity in the current cart
// Using PUT on the collection /items and identifying the item in the body
// or using a path param like /items/:itemId is a design choice.
// Identifying by product/variant in the body is common and arguably simpler for carts.
router.put(
  '/items',
  validateRequestBody(UpdateCartItemInputSchema),
  cartController.updateCartItem
);


// DELETE /api/v1/cart/items - Remove item from the current cart
// Using DELETE on the collection /items and identifying the item in the body
// or using a path param like /items/:itemId is a design choice.
// Identifying by product/variant in the body is common for DELETE on collections.
router.delete(
    '/items',
    validateRequestBody(RemoveItemFromCartInputSchema), // DELETE with body is unconventional but common for APIs needing identifying info
    cartController.removeItemFromCart
);

// POST /api/v1/cart/clear - Clear the entire cart
router.post('/clear', cartController.clearCart);


// POST /api/v1/cart/coupon - Apply a coupon
router.post(
    '/coupon',
    validateRequestBody( ApplyCouponInputSchema),
    cartController.applyCoupon
);

// DELETE /api/v1/cart/coupon - Remove the applied coupon
router.delete('/coupon', cartController.removeCoupon);


// PUT /api/v1/cart/details - Update cart details (shipping method, notes)
router.put(
    '/details',
    validateRequestBody(UpdateCartDetailsInputSchema ),
    cartController.updateCartDetails
);


// Note: Consider adding authentication middleware where necessary.
// E.g., maybe clearing cart or applying coupon requires login? Depends on requirements.
// Currently, most routes use req.user or req.sessionId, handled by the service.

export default router;