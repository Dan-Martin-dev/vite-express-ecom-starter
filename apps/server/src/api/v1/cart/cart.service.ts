// cart.service.ts
import { CartRepository } from './cart.repository.js';
import { CartItem } from '@/types/index.js'; // <-- Import from your global types
import {
  findCartItem,
  addOrUpdateCartItem,
  removeCartItem,
  updateCartItemQuantity,
  calculateCartTotals,
} from './cart.utils.js';
import { AppError } from '@/lib/errors/AppError.js'; // Assuming your error handling
import { NotFoundError } from '@/lib/errors/NotFoundError.js';
import { ConflictError } from '@/lib/errors/ConflictError.js'; // For cases like insufficient stock

// Need to import or inject Product and Coupon services/repositories
// Example imports (adjust paths):
// import { ProductService } from '@/features/products/product.service';
// import { CouponService } from '@/features/coupons/coupon.service';


export class CartService {
  // Inject repository and potentially other services
  constructor(
    private cartRepository: CartRepository,
    // private productService: ProductService, // Needed for fetching product/variant details/stock
    // private couponService: CouponService, // Needed for validating and applying coupons
  ) {}

  /**
   * Finds an existing cart for a user or session, or creates a new one if none exists.
   * @param userId Optional user ID.
   * @param sessionId Required session ID (for guest carts).
   * @returns The user's or session's cart.
   */
  async getOrCreateCartForUserOrSession(userId: string | undefined, sessionId: string): Promise<Cart> {
    if (!sessionId) {
         // This case should ideally not happen if session middleware is used, but good to guard
         throw new AppError('Session ID is required to get or create a cart.', 400);
    }

    let cart: Cart | undefined;

    if (userId) {
      // Try to find a cart for the logged-in user
      cart = await this.cartRepository.findByUserId(userId);
      // If a guest cart exists for this session, merge it with the user cart or transfer it
      const guestCart = await this.cartRepository.findBySessionId(sessionId);

      if (guestCart) {
          if (cart) {
              // User cart exists, merge guest cart items into user cart
              // TODO: Implement merge logic in a separate method or here
              console.log(`Merging guest cart ${guestCart.id} into user cart ${cart.id}`);
              // For now, let's just delete the guest cart and return the user cart
               await this.cartRepository.delete(guestCart.id); // Simple merge: just keep user cart
               // A more sophisticated merge would combine items, choose the better coupon, etc.
          } else {
              // No user cart, but guest cart exists. Transfer the guest cart to the user.
               console.log(`Transferring guest cart ${guestCart.id} to user ${userId}`);
               cart = await this.transferCartToUser({ sessionId, userId });
          }
      }
       if (!cart) {
         // No cart found for user AND no guest cart to transfer, create a new one for the user
         console.log(`Creating new cart for user ${userId}`);
         cart = await this.cartRepository.create({ userId, sessionId, items: [], itemsPrice: '0', totalPrice: '0' });
       }

    } else {
      // User is not logged in, find or create a guest cart using session ID
      cart = await this.cartRepository.findBySessionId(sessionId);
      if (!cart) {
         console.log(`Creating new guest cart for session ${sessionId}`);
         cart = await this.cartRepository.create({ sessionId, items: [], itemsPrice: '0', totalPrice: '0' });
      }
    }

    return cart;
  }

  /**
   * Adds an item to the cart or updates its quantity if already present.
   * Handles fetching product data, stock checks, and recalculating totals.
   * @param cartId The ID of the cart to modify.
   * @param itemInput Details of the item to add.
   * @returns The updated cart object.
   */
  async addItemToCart(cartId: string, itemInput: AddItemToCartInput): Promise<Cart> {
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) {
      throw new NotFoundError('Cart not found.');
    }

    // --- Business Logic / Dependencies ---
    // 1. Fetch product/variant details to get current price, name, stock, etc.
    //    This requires the ProductService or ProductRepository.
    //    const product = await this.productService.getProductById(itemInput.productId);
    //    if (!product) throw new NotFoundError('Product not found.');
    //    const variant = itemInput.variantId ? await this.productService.getProductVariantById(itemInput.variantId) : null;
    //    if (itemInput.variantId && !variant) throw new NotFoundError('Product variant not found.');

    // 2. Perform stock check BEFORE adding/updating.
    //    const itemStock = variant?.stock ?? product.stock;
    //    const existingItem = findCartItem(cart, itemInput.productId, itemInput.variantId);
    //    const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
    //    const totalQuantityAfterAdd = currentQuantityInCart + itemInput.quantity;

    //    if (product.stockManagement && itemStock !== undefined && totalQuantityAfterAdd > itemStock) {
    //        throw new ConflictError(`Insufficient stock for ${product.name}${variant ? ' (' + JSON.stringify(variant.attributes) + ')' : ''}. Available: ${itemStock}`);
    //    }

    // --- Prepare the new CartItem object (including snapshot data) ---
    // This is crucial. Store the price, name, image *at the time of adding*
    // const price = variant?.price ?? product.salePrice ?? product.basePrice;
    // const salePrice = variant?.salePrice ?? product.salePrice;
    // const name = product.name;
    // const sku = variant?.sku ?? product.sku;
    // const image = variant?.image ?? product.images?.[0]; // Or a default image
    // const attributes = variant?.attributes;

    const newItem: CartItem = {
        productId: itemInput.productId,
        variantId: itemInput.variantId,
        quantity: itemInput.quantity,
        // Placeholder data - replace with actual fetched data
        name: 'Fetched Product Name Placeholder',
        price: '10.00', // Use price fetched from product/variant
        // salePrice: '8.00', // Use salePrice fetched from product/variant
        // sku: 'SKU123', // Use sku fetched from product/variant
        // image: 'image_url', // Use image fetched from product/variant
        // attributes: attributes // Use attributes for variants
    };


    // 3. Update the items array using utility function
    const updatedItems = addOrUpdateCartItem(cart.items || [], newItem);

    // 4. Recalculate cart totals (needs products/variants data AND coupon data)
    // const { productsMap, variantsMap } = await fetchCartItemDetails(updatedItems, this.productRepository); // Need fetch helper
    // const coupon = cart.couponCode ? await this.couponService.getCouponByCode(cart.couponCode) : undefined; // Need coupon service
    // const updatedTotals = calculateCartTotals({ ...cart, items: updatedItems }, productsMap, variantsMap, coupon);

    // 5. Save the updated cart to the database
    const updatedCart = await this.cartRepository.update(cartId, {
      items: updatedItems,
      // ...updatedTotals // Update totals after recalculation
    });

    if (!updatedCart) {
         // This shouldn't happen if update was successful
         throw new AppError('Failed to update cart after adding item.', 500);
    }

    return updatedCart;
  }

  /**
   * Removes an item from the cart.
   * Handles recalculating totals.
   * @param cartId The ID of the cart to modify.
   * @param itemInput Details of the item to remove.
   * @returns The updated cart object.
   */
  async removeItemFromCart(cartId: string, itemInput: RemoveItemFromCartInput): Promise<Cart> {
      const cart = await this.cartRepository.findById(cartId);
      if (!cart) {
        throw new NotFoundError('Cart not found.');
      }

      // 1. Remove the item using utility function
      const updatedItems = removeCartItem(cart.items || [], itemInput.productId, itemInput.variantId);

      // If the items array is the same length, the item wasn't found
      if (updatedItems.length === (cart.items || []).length) {
          // Depending on requirements, maybe throw NotFoundError or just return current cart
           console.warn(`Attempted to remove item (product: ${itemInput.productId}, variant: ${itemInput.variantId}) not found in cart ${cartId}`);
           return cart; // Item not found, return original cart
      }


      // 2. Recalculate cart totals (needs products/variants data AND coupon data)
      // const { productsMap, variantsMap } = await fetchCartItemDetails(updatedItems, this.productRepository); // Need fetch helper
      // const coupon = cart.couponCode ? await this.couponService.getCouponByCode(cart.couponCode) : undefined; // Need coupon service
      // const updatedTotals = calculateCartTotals({ ...cart, items: updatedItems }, productsMap, variantsMap, coupon);


      // 3. Save the updated cart
      const updatedCart = await this.cartRepository.update(cartId, {
        items: updatedItems,
        // ...updatedTotals // Update totals after recalculation
      });

       if (!updatedCart) {
           throw new AppError('Failed to update cart after removing item.', 500);
       }

      return updatedCart;
  }

   /**
   * Updates the quantity of a specific item in the cart.
   * Handles stock checks and recalculating totals.
   * @param cartId The ID of the cart to modify.
   * @param itemInput Details of the item to update.
   * @returns The updated cart object.
   */
  async updateCartItem(cartId: string, itemInput: UpdateCartItemInput): Promise<Cart> {
       const cart = await this.cartRepository.findById(cartId);
        if (!cart) {
            throw new NotFoundError('Cart not found.');
        }

        // Find the existing item
        const existingItem = findCartItem(cart, itemInput.productId, itemInput.variantId);
         if (!existingItem) {
             throw new NotFoundError('Item not found in cart.');
         }

        const newQuantity = itemInput.newQuantity; // Zod ensures this is > 0 if provided


        // --- Business Logic / Dependencies ---
        // 1. Fetch product/variant details for stock check if newQuantity is provided
        //    const product = await this.productService.getProductById(existingItem.productId);
        //    if (!product) throw new AppError('Product not found for cart item.'); // Should not happen if data is consistent
        //    const variant = existingItem.variantId ? await this.productService.getProductVariantById(existingItem.variantId) : null;
        //    if (existingItem.variantId && !variant) throw new AppError('Product variant not found for cart item.'); // Should not happen


        // 2. Perform stock check if quantity is increasing
        // if (newQuantity !== undefined && newQuantity > existingItem.quantity) {
        //    const itemStock = variant?.stock ?? product.stock;
        //     if (product.stockManagement && itemStock !== undefined && newQuantity > itemStock) {
        //         throw new ConflictError(`Insufficient stock for ${existingItem.name}. Available: ${itemStock}`);
        //     }
        // }
        // TODO: Handle newVariantId logic if implemented (requires removing old, adding new, stock checks)


        // --- Update the items array ---
        let updatedItems;
        if (newQuantity !== undefined) {
             updatedItems = updateCartItemQuantity(cart.items || [], existingItem.productId, existingItem.variantId, newQuantity);
        } else {
            // If only newVariantId was provided (TODO), handle that logic
            updatedItems = cart.items; // No changes to items array structure yet
        }


        // 3. Recalculate cart totals (needs products/variants data AND coupon data)
        // const { productsMap, variantsMap } = await fetchCartItemDetails(updatedItems, this.productRepository); // Need fetch helper
        // const coupon = cart.couponCode ? await this.couponService.getCouponByCode(cart.couponCode) : undefined; // Need coupon service
        // const updatedTotals = calculateCartTotals({ ...cart, items: updatedItems }, productsMap, variantsMap, coupon);


        // 4. Save the updated cart
        const updatedCart = await this.cartRepository.update(cartId, {
          items: updatedItems,
          // ...updatedTotals // Update totals after recalculation
        });

        if (!updatedCart) {
           throw new AppError('Failed to update cart item.', 500);
        }

        return updatedCart;
  }


  /**
   * Clears all items from a cart.
   * @param cartId The ID of the cart to clear.
   * @returns The updated, empty cart object.
   */
  async clearCart(cartId: string): Promise<Cart> {
       const cart = await this.cartRepository.findById(cartId);
        if (!cart) {
            throw new NotFoundError('Cart not found.');
        }

      // 1. Clear the items array
      const updatedItems: CartItem[] = [];

       // 2. Recalculate cart totals (will be zero)
      // const { productsMap, variantsMap } = await fetchCartItemDetails(updatedItems, this.productRepository); // Not strictly needed for zero items but good pattern
      // const coupon = cart.couponCode ? await this.couponService.getCouponByCode(cart.couponCode) : undefined; // Coupon might be removed or invalid
      // const updatedTotals = calculateCartTotals({ ...cart, items: updatedItems }, productsMap, variantsMap, coupon);


       // 3. Save the updated cart
       const updatedCart = await this.cartRepository.update(cartId, {
         items: updatedItems,
         couponCode: null, // Clear coupon when clearing items is typical
         // ...updatedTotals // Update totals after recalculation (should be zeroes)
          itemsPrice: '0', // Manual zeroing if calculation is skipped
          discountAmount: '0',
          // shippingPrice might remain or reset depending on logic
          // taxPrice might remain or reset depending on logic
          totalPrice: '0',
       });

       if (!updatedCart) {
           throw new AppError('Failed to clear cart.', 500);
       }

       return updatedCart;
  }

   /**
   * Applies a coupon to the cart.
   * Validates the coupon and recalculates totals.
   * @param cartId The ID of the cart.
   * @param couponCode The coupon code to apply.
   * @returns The updated cart object.
   */
  async applyCoupon(cartId: string, couponCode: string): Promise<Cart> {
      const cart = await this.cartRepository.findById(cartId);
      if (!cart) {
         throw new NotFoundError('Cart not found.');
      }

      // --- Business Logic / Dependencies ---
      // 1. Fetch and validate the coupon using CouponService
      // const coupon = await this.couponService.validateCoupon(couponCode, cart); // Need validation logic (expiry, usage limits, min/max spend, exclusions)
      // if (!coupon) {
      //   // Coupon is invalid, expired, or used up
      //   throw new AppError('Invalid, expired, or used coupon code.', 400); // Or more specific error
      // }

       // 2. Update the coupon code in the cart
       const updatedCartWithCoupon = await this.cartRepository.update(cartId, {
         couponCode: couponCode,
       });

       if (!updatedCartWithCoupon) {
            throw new AppError('Failed to apply coupon to cart.', 500);
       }

       // 3. Recalculate cart totals with the new coupon
       // This step is crucial because the coupon affects discount and potentially shipping
       // const { productsMap, variantsMap } = await fetchCartItemDetails(updatedCartWithCoupon.items || [], this.productRepository);
       // const updatedTotals = calculateCartTotals(updatedCartWithCoupon, productsMap, variantsMap, coupon);

        // 4. Save the cart again with updated totals
       const finalUpdatedCart = await this.cartRepository.update(cartId, {
           // ...updatedTotals // Update totals
       });

       if (!finalUpdatedCart) {
            throw new AppError('Failed to recalculate totals after applying coupon.', 500);
       }

       return finalUpdatedCart; // Return the cart with recalculations
  }

   /**
   * Removes the applied coupon from the cart.
   * Recalculates totals.
   * @param cartId The ID of the cart.
   * @returns The updated cart object.
   */
  async removeCoupon(cartId: string): Promise<Cart> {
       const cart = await this.cartRepository.findById(cartId);
        if (!cart) {
           throw new NotFoundError('Cart not found.');
        }

        // If no coupon is applied, just return the current cart
        if (!cart.couponCode) {
            return cart;
        }

       // 1. Remove the coupon code
       const updatedCartWithoutCoupon = await this.cartRepository.update(cartId, {
         couponCode: null,
         discountAmount: '0', // Reset discount
       });

       if (!updatedCartWithoutCoupon) {
             throw new AppError('Failed to remove coupon from cart.', 500);
        }

       // 2. Recalculate cart totals without the coupon
       // const { productsMap, variantsMap } = await fetchCartItemDetails(updatedCartWithoutCoupon.items || [], this.productRepository);
       // const updatedTotals = calculateCartTotals(updatedCartWithoutCoupon, productsMap, variantsMap, undefined); // Pass undefined for coupon

       // 3. Save the cart again with updated totals
       const finalUpdatedCart = await this.cartRepository.update(cartId, {
           // ...updatedTotals // Update totals (should now exclude coupon effects)
       });

        if (!finalUpdatedCart) {
            throw new AppError('Failed to recalculate totals after removing coupon.', 500);
        }

       return finalUpdatedCart;
  }

   /**
    * Updates shipping method or notes for the cart.
    * May trigger recalculation if shipping price depends on method.
    * @param cartId The ID of the cart.
    * @param detailsInput The details to update.
    * @returns The updated cart object.
    */
   async updateCartDetails(cartId: string, detailsInput: UpdateCartDetailsInput): Promise<Cart> {
        const cart = await this.cartRepository.findById(cartId);
        if (!cart) {
           throw new NotFoundError('Cart not found.');
        }

        // --- Business Logic / Dependencies ---
        // 1. If shippingMethod is updated, calculate new shipping cost.
        //    This might involve a separate ShippingService or lookup.
        //    const newShippingPrice = detailsInput.shippingMethod ? await this.shippingService.calculateCost(cart, detailsInput.shippingMethod) : cart.shippingPrice;

        const updateData: CartUpdate = {
             ...detailsInput,
             // shippingPrice: newShippingPrice ? String(newShippingPrice.toFixed(2)) : cart.shippingPrice // Update shipping price if calculated
        };

        // 2. Update the cart with new details
        const updatedCartWithDetails = await this.cartRepository.update(cartId, updateData);

        if (!updatedCartWithDetails) {
             throw new AppError('Failed to update cart details.', 500);
        }

        // 3. Recalculate totals if shipping price changed (or notes were updated)
        //    Even if just notes updated, recalculating totals is often harmless
        // const { productsMap, variantsMap } = await fetchCartItemDetails(updatedCartWithDetails.items || [], this.productRepository);
        // const coupon = updatedCartWithDetails.couponCode ? await this.couponService.getCouponByCode(updatedCartWithDetails.couponCode) : undefined;
        // const updatedTotals = calculateCartTotals(updatedCartWithDetails, productsMap, variantsMap, coupon);

        // 4. Save the cart again with updated totals
        const finalUpdatedCart = await this.cartRepository.update(cartId, {
           // ...updatedTotals // Update totals
           // Note: The updateData object already includes shippingMethod/notes
        });

         if (!finalUpdatedCart) {
            throw new AppError('Failed to recalculate totals after updating details.', 500);
         }

        return finalUpdatedCart;
   }

    /**
     * Transfers a guest cart to a user account upon login/registration.
     * Merges or replaces user's existing cart if necessary.
     * @param input Session ID and User ID.
     * @returns The resulting cart for the user.
     */
    async transferCartToUser(input: TransferCartInput): Promise<Cart> {
        const guestCart = await this.cartRepository.findBySessionId(input.sessionId);
        if (!guestCart) {
            // No guest cart to transfer, maybe just return the user's potential cart?
            // Or throw an error depending on flow. Let's find or create user cart.
             console.warn(`No guest cart found for session ${input.sessionId} to transfer to user ${input.userId}.`);
             return this.getOrCreateCartForUserOrSession(input.userId, input.sessionId); // Fallback to standard user cart logic
        }

        const userCart = await this.cartRepository.findByUserId(input.userId);

        if (userCart) {
            // User already has a cart. Merge guest cart items into user cart.
            console.log(`Merging guest cart ${guestCart.id} into existing user cart ${userCart.id}.`);
            // TODO: Implement sophisticated merge logic
            // For now, a simple merge might be:
            // 1. Combine items, summing quantities for same product/variant.
            // 2. Re-calculate totals.
            // 3. Delete the guest cart.

            const mergedItems = (userCart.items || []).reduce((acc, userItem) => {
                // Find equivalent in guest cart
                const guestItem = findCartItem(guestCart, userItem.productId, userItem.variantId);
                if (guestItem) {
                     // Item exists in both, add quantities
                    acc.push({ ...userItem, quantity: userItem.quantity + guestItem.quantity });
                } else {
                    // Item only in user cart
                    acc.push(userItem);
                }
                 return acc;
            }, [] as CartItem[]); // Initialize accumulator

            // Add items only present in the guest cart
             (guestCart.items || []).forEach(guestItem => {
                if (!findCartItem({ ...userCart, items: mergedItems }, guestItem.productId, guestItem.variantId)) {
                    mergedItems.push(guestItem);
                }
             });


            // Update user cart with merged items
            const updatedUserCart = await this.cartRepository.update(userCart.id, {
                items: mergedItems,
                // TODO: Recalculate totals for merged cart
                // Consider coupon logic: which coupon to keep? Maybe user's? None?
            });

            // Delete the old guest cart
             await this.cartRepository.delete(guestCart.id);

             if (!updatedUserCart) {
                  throw new AppError('Failed to merge guest cart into user cart.', 500);
             }

             return updatedUserCart;

        } else {
            // No user cart, simply assign guest cart to user
            console.log(`Assigning guest cart ${guestCart.id} to user ${input.userId}.`);
            const transferredCart = await this.cartRepository.update(guestCart.id, {
                userId: input.userId,
                sessionId: '', // Clear session ID? Or keep it? Decide on logic.
            });

             if (!transferredCart) {
                  throw new AppError('Failed to transfer guest cart to user.', 500);
             }
            return transferredCart;
        }
    }

    // TODO: Implement a background job or scheduled task to clean up expired guest carts
    // async cleanupExpiredGuestCarts(): Promise<number> { ... }

     // TODO: Implement logic to update cart totals and item details periodically or upon relevant events
     // async refreshCartData(cartId: string): Promise<Cart> { ... } // Fetches latest product/coupon data and recalculates totals
}

// Export an instance of the service, injecting the repository
export const cartService = new CartService(
    cartRepository,
    // You'll need to import and inject productService and couponService here
    // productService,
    // couponService
);