// cart.utils.ts
import { Cart, CartItem, CartTotals } from './cart.types.js';
import { products as productsSchema, productVariants as productVariantsSchema } from '@/db/schema/products.schema.js'; // Need product/variant schema
import { InferSelectModel } from 'drizzle-orm';
import { coupons as couponsSchema } from '@/db/schema/coupons.schema.js'; // Need coupon schema

// Define simplified types for product/variant data needed for calculations
type ProductForCartCalculation = InferSelectModel<typeof productsSchema>;
type ProductVariantForCartCalculation = InferSelectModel<typeof productVariantsSchema>;
type CouponForCartCalculation = InferSelectModel<typeof couponsSchema>;


/**
 * Finds an item within the cart's items array by product and variant ID.
 * @param cart The cart object.
 * @param productId The product ID to find.
 * @param variantId The variant ID to find (optional).
 * @returns The found CartItem or undefined.
 */
export function findCartItem(cart: Cart, productId: string, variantId?: string): CartItem | undefined {
  if (!cart || !Array.isArray(cart.items)) {
      return undefined;
  }
  return cart.items.find(item =>
    item.productId === productId && item.variantId === variantId
  );
}

/**
 * Adds a new item or updates the quantity of an existing item in the cart's items array.
 * Does NOT handle price calculation or stock checks. Returns a NEW array of items.
 * @param currentItems The current array of CartItems.
 * @param newItem The CartItem to add or merge.
 * @returns A new array of CartItems.
 */
export function addOrUpdateCartItem(currentItems: CartItem[], newItem: CartItem): CartItem[] {
  const existingItemIndex = currentItems.findIndex(item =>
    item.productId === newItem.productId && item.variantId === newItem.variantId
  );

  if (existingItemIndex > -1) {
    // Item exists, update quantity
    const updatedItems = [...currentItems];
    updatedItems[existingItemIndex] = {
      ...updatedItems[existingItemIndex],
      quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
    };
    return updatedItems;
  } else {
    // Item does not exist, add it
    return [...currentItems, newItem];
  }
}

/**
 * Removes an item from the cart's items array. Returns a NEW array of items.
 * @param currentItems The current array of CartItems.
 * @param productId The product ID of the item to remove.
 * @param variantId The variant ID of the item to remove (optional).
 * @returns A new array of CartItems.
 */
export function removeCartItem(currentItems: CartItem[], productId: string, variantId?: string): CartItem[] {
   if (!Array.isArray(currentItems)) {
      return [];
   }
  return currentItems.filter(item =>
    !(item.productId === productId && item.variantId === variantId)
  );
}

/**
 * Updates the quantity of a specific item in the cart's items array. Returns a NEW array of items.
 * @param currentItems The current array of CartItems.
 * @param productId The product ID of the item to update.
 * @param variantId The variant ID of the item to update (optional).
 * @param newQuantity The new quantity for the item.
 * @returns A new array of CartItems. Returns original if item not found.
 */
export function updateCartItemQuantity(currentItems: CartItem[], productId: string, variantId: string | undefined, newQuantity: number): CartItem[] {
    if (!Array.isArray(currentItems)) {
      return [];
   }
    const existingItemIndex = currentItems.findIndex(item =>
        item.productId === productId && item.variantId === variantId
    );

    if (existingItemIndex === -1) {
        return currentItems; // Item not found
    }

    const updatedItems = [...currentItems];
    updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: newQuantity,
    };

    // Optional: remove if quantity is 0 or less
    if (newQuantity <= 0) {
        return removeCartItem(currentItems, productId, variantId);
    }

    return updatedItems;
}


/**
 * Calculates the total price, discount, tax, and shipping for a cart.
 * This is a critical and potentially complex function. It assumes you have
 * the necessary product/variant data and coupon data available.
 *
 * @param cart The cart object.
 * @param productsData Map of productId to Product data (including basePrice, salePrice).
 * @param variantsData Map of variantId to ProductVariant data (including price, salePrice).
 * @param coupon The applied Coupon object (optional).
 * @returns Calculated CartTotals.
 */
export function calculateCartTotals(
    cart: Cart,
    productsData: Map<string, ProductForCartCalculation>,
    variantsData: Map<string, ProductVariantForCartCalculation>,
    coupon?: CouponForCartCalculation // You'll need to fetch this based on cart.couponCode
): CartTotals {
    let itemsPrice = 0;
    let discountAmount = 0;
    let shippingPrice = parseFloat(cart.shippingPrice || '0'); // Use current shipping price from cart
    let taxPrice = parseFloat(cart.taxPrice || '0'); // Use current tax price from cart

    if (!Array.isArray(cart.items)) {
        return {
            itemsPrice: '0.00',
            discountAmount: '0.00',
            shippingPrice: shippingPrice.toFixed(2),
            taxPrice: taxPrice.toFixed(2),
            totalPrice: (shippingPrice + taxPrice).toFixed(2),
        };
    }

    // 1. Calculate itemsPrice based on current product/variant prices (snapshot or live)
    // It's best practice to use snapshot prices stored in CartItem, but if not,
    // you'd look up prices from productsData/variantsData here.
    // Assuming CartItem price/salePrice is the snapshot price:
    itemsPrice = cart.items.reduce((sum, item) => {
        const itemPrice = item.salePrice !== null && item.salePrice !== undefined
            ? parseFloat(item.salePrice)
            : parseFloat(item.price);
        return sum + itemPrice * item.quantity;
    }, 0);

    // 2. Apply Coupon Discount
    if (coupon && coupon.isActive && (!coupon.startDate || new Date(coupon.startDate) <= new Date()) && (!coupon.endDate || new Date(coupon.endDate) >= new Date())) {
        // Check usage limits (this might be complex, potentially involving another table or service call)
        // For simplicity here, we just check validity and apply discount
        const minimumSpend = parseFloat(coupon.minimumSpend || '0');
        const maximumSpend = parseFloat(coupon.maximumSpend || 'Infinity');

        if (itemsPrice >= minimumSpend && itemsPrice <= maximumSpend) {
             const discountValue = parseFloat(coupon.discountValue);
             if (coupon.discountType === 'fixed_amount') {
                 discountAmount = discountValue;
             } else if (coupon.discountType === 'percentage') {
                 discountAmount = (itemsPrice * discountValue) / 100;
             } else if (coupon.discountType === 'free_shipping') {
                 // Free shipping logic - this might mean setting shippingPrice to 0
                 // and potentially storing the original shipping cost somewhere else.
                 // For now, we'll just note it. The actual shipping calculation
                 // might be separate.
                 // discountAmount = 0; // Or handle this effect outside discountAmount
             }
            // Ensure discountAmount doesn't exceed itemsPrice
            discountAmount = Math.min(discountAmount, itemsPrice);
        }
    }

    // 3. Calculate Total Price
    // Note: Tax and Shipping calculation can be very complex depending on rules,
    // destination, product types, etc. These fields might be updated separately
    // based on user input or configuration. For this utility, we'll just use
    // the values already present in the cart object.
    const subtotalAfterDiscount = itemsPrice - discountAmount;
    const totalPrice = subtotalAfterDiscount + shippingPrice + taxPrice;

    return {
        itemsPrice: itemsPrice.toFixed(2),
        discountAmount: discountAmount.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
    };
}


// Helper to fetch product/variant data for items in the cart (needed for recalculation)
// This function belongs more in the Service layer or a dedicated Product Service,
// but illustrating the need here.
/*
async function fetchCartItemDetails(items: CartItem[], productRepository: any): Promise<{ products: Map<string, ProductForCartCalculation>, variants: Map<string, ProductVariantForCartCalculation> }> {
    const productIds = [...new Set(items.map(item => item.productId))];
    const variantIds = [...new Set(items.map(item => item.variantId).filter(id => id !== undefined))] as string[];

    const productsData = await productRepository.findByIds(productIds); // Need a repo method for this
    const variantsData = variantIds.length > 0 ? await productRepository.findVariantsByIds(variantIds) : []; // Need a repo method

    const productsMap = new Map(productsData.map(p => [p.id, p]));
    const variantsMap = new Map(variantsData.map(v => [v.id, v]));

    return { products: productsMap, variants: variantsMap };
}
*/