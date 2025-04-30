// types.ts based on carts.schema.ts and common cart operations
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { carts as cartsSchema } from '@/db/schema/carts.schema.js'; // Assuming path is correct

// --- Database Models ---
export type Cart = InferSelectModel<typeof cartsSchema>;
export type NewCart = InferInsertModel<typeof cartsSchema>;

// Type for partial updates to a cart record
export type CartUpdate = Partial<Cart>; // <--- ADD THIS LINE

export interface CartItem {
  productId: string;
  variantId?: string; // Optional if adding a base product
  quantity: number;
  // Include snapshot data to protect against price/name changes after adding
  name: string;
  sku?: string;
  price: string; // Use string for decimal to avoid float issues
  salePrice?: string | null;
  image?: string; // Main image for the item
  // Add attributes if it's a variant for display purposes
  attributes?: { [attributeId: string]: string }; // e.g., { color: 'Red', size: 'L' }
}

// --- Service/Controller Input/Output Types ---

// Input for adding an item
export interface AddItemToCartInput {
  productId: string;
  variantId?: string;
  quantity?: number;
}

// Input for updating an item quantity/variant
export interface UpdateCartItemInput {
  // How to identify the item? By index in array? Or a temporary item ID?
  // Using product/variant IDs is safer but requires finding the item first.
  productId: string;
  variantId?: string; // The item to update
  newQuantity?: number; // New quantity
  newVariantId?: string; // Optional: change variant (complex operation)
}

// Input for removing an item
export interface RemoveItemFromCartInput {
  productId: string;
  variantId?: string; // The item to remove
}

// Input for applying a coupon
export interface ApplyCouponInput {
  couponCode: string;
}

// Input for updating shipping details/notes
export interface UpdateCartDetailsInput {
  shippingMethod?: string;
  notes?: string;
}

// Could extend Cart type or be a new type if denormalized data is returned
export type CartWithDetails = Cart; // For now, simple type, can be expanded
// Example: CartWithDetails = Omit<Cart, 'items'> & { items: DetailedCartItem[] };
// export interface DetailedCartItem extends CartItem {
//   productDetails: InferSelectModel<typeof productsSchema>;
//   variantDetails?: InferSelectModel<typeof productVariantsSchema> | null;
// }


// Type for calculated totals
export interface CartTotals {
  itemsPrice: string;
  discountAmount: string;
  shippingPrice: string; // Might come from shipping method, not stored on cart itself initially
  taxPrice: string;
  totalPrice: string;
}

// Type for creating a guest cart
export interface CreateGuestCartInput {
  sessionId: string;
}

// Type for transferring a cart to a user
export interface TransferCartInput {
    sessionId: string;
    userId: string;
}