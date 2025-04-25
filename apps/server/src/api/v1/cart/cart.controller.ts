// cart.controller.ts
import { Request, Response, NextFunction } from 'express'; // Assuming Express or similar framework
import { CartService } from './cart.service';
import {
    AddItemToCartInput,
    UpdateCartItemInput,
    RemoveItemFromCartInput,
    ApplyCouponInput,
    UpdateCartDetailsInput
} from './cart.types';
import { AuthenticatedRequest } from '@/middleware/auth.middleware'; // Assuming your auth middleware adds user info

export class CartController {
  constructor(private cartService: CartService) {}

  /**
   * Get the current user's or session's cart. Creates one if it doesn't exist.
   */
  async getUserCart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      // Assuming req.user is populated by auth middleware for logged-in users
      const userId = req.user?.id;
      // Assuming req.sessionId is populated by session middleware for all requests
      const sessionId = req.sessionId; // You'll need middleware to handle sessions

      // Pass both userId and sessionId to the service, which handles the logic
      const cart = await this.cartService.getOrCreateCartForUserOrSession(userId, sessionId);

      res.status(200).json(cart);
    } catch (error) {
      next(error); // Pass errors to your central error handler
    }
  }

  /**
   * Add an item to the cart.
   */
  async addItemToCart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
      try {
        const itemInput: AddItemToCartInput = req.body; // Zod validation middleware already processed this

        const userId = req.user?.id;
        const sessionId = req.sessionId;

        // Get or create the cart first
        const cart = await this.cartService.getOrCreateCartForUserOrSession(userId, sessionId);

        // Add the item to the retrieved/created cart
        const updatedCart = await this.cartService.addItemToCart(cart.id, itemInput);

        res.status(200).json(updatedCart); // 200 OK or 201 Created? 200 if item quantity increased, 201 if new item added. Let's stick to 200 for simplicity.

      } catch (error) {
        next(error);
      }
  }

  /**
   * Update an item's quantity in the cart.
   */
  async updateCartItem(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
      try {
         // Need a way to identify the cart. Either from auth/session or path param.
         // Let's assume auth/session identifies the cart implicitly for the user/session.
         const userId = req.user?.id;
         const sessionId = req.sessionId;

         const cart = await this.cartService.getOrCreateCartForUserOrSession(userId, sessionId);
         if (!cart) {
              // This case is unlikely with getOrCreateCartForUserOrSession, but guard
              throw new Error('Could not retrieve or create cart.'); // Use a more specific error type
         }

         // The input includes productId and variantId to identify the item, and newQuantity/newVariantId
         const itemInput: UpdateCartItemInput = req.body; // Zod validated

         const updatedCart = await this.cartService.updateCartItem(cart.id, itemInput);

         res.status(200).json(updatedCart);

      } catch (error) {
         next(error);
      }
  }


   /**
   * Remove an item from the cart.
   */
  async removeItemFromCart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
      try {
         const userId = req.user?.id;
         const sessionId = req.sessionId;

         const cart = await this.cartService.getOrCreateCartForUserOrSession(userId, sessionId);
         if (!cart) {
              throw new Error('Could not retrieve or create cart.');
         }

         // Input includes productId and variantId to identify the item to remove
         const itemInput: RemoveItemFromCartInput = req.body; // Zod validated

         const updatedCart = await this.cartService.removeItemFromCart(cart.id, itemInput);

         res.status(200).json(updatedCart);

      } catch (error) {
         next(error);
      }
  }

  /**
   * Clear all items from the cart.
   */
   async clearCart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
       try {
         const userId = req.user?.id;
         const sessionId = req.sessionId;

         const cart = await this.cartService.getOrCreateCartForUserOrSession(userId, sessionId);
         if (!cart) {
              throw new Error('Could not retrieve or create cart.');
         }

         const updatedCart = await this.cartService.clearCart(cart.id);

         res.status(200).json(updatedCart);

      } catch (error) {
         next(error);
      }
   }


   /**
    * Apply a coupon code to the cart.
    */
    async applyCoupon(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
       try {
         const userId = req.user?.id;
         const sessionId = req.sessionId;

         const cart = await this.cartService.getOrCreateCartForUserOrSession(userId, sessionId);
         if (!cart) {
              throw new Error('Could not retrieve or create cart.');
         }

         const { couponCode }: ApplyCouponInput = req.body; // Zod validated

         const updatedCart = await this.cartService.applyCoupon(cart.id, couponCode);

         res.status(200).json(updatedCart);

       } catch (error) {
         next(error);
       }
    }

    /**
     * Remove the applied coupon from the cart.
     */
    async removeCoupon(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
         const userId = req.user?.id;
         const sessionId = req.sessionId;

         const cart = await this.cartService.getOrCreateCartForUserOrSession(userId, sessionId);
         if (!cart) {
              throw new Error('Could not retrieve or create cart.');
         }

         const updatedCart = await this.cartService.removeCoupon(cart.id);

         res.status(200).json(updatedCart);

       } catch (error) {
         next(error);
       }
    }

     /**
     * Update cart details like shipping method or notes.
     */
    async updateCartDetails(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
         try {
             const userId = req.user?.id;
             const sessionId = req.sessionId;

             const cart = await this.cartService.getOrCreateCartForUserOrSession(userId, sessionId);
             if (!cart) {
                  throw new Error('Could not retrieve or create cart.');
             }

             const detailsInput: UpdateCartDetailsInput = req.body; // Zod validated

             const updatedCart = await this.cartService.updateCartDetails(cart.id, detailsInput);

             res.status(200).json(updatedCart);

         } catch (error) {
             next(error);
         }
    }


    // TODO: Add a route/controller method for transferring guest cart to user upon login,
    // though this might be triggered internally by the auth feature after login.
    // async transferGuestCart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> { ... }
}

// Export an instance of the controller, injecting the service
export const cartController = new CartController(cartService);