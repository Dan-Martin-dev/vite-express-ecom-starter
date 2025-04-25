// cart.validator.ts
import { z } from 'zod';
import { AddItemToCartInput, UpdateCartItemInput, RemoveItemFromCartInput, ApplyCouponInput, UpdateCartDetailsInput } 
from './cart.types.js';

// Schema for adding an item to cart
export const AddItemToCartInputSchema = z.object({
  productId: z.string().uuid("Invalid product ID format."),
  variantId: z.string().uuid("Invalid variant ID format.").optional(),
  quantity: z.number().int().positive("Quantity must be a positive integer.").default(1),
}) satisfies z.ZodSchema<AddItemToCartInput>;

// Schema for updating an item in the cart
// Note: This assumes identifying the item by product/variant ID combo.
export const UpdateCartItemInputSchema = z.object({
  productId: z.string().uuid("Invalid product ID format."),
  variantId: z.string().uuid("Invalid variant ID format.").optional(),
  newQuantity: z.number().int().positive("New quantity must be a positive integer.").optional(),
  // newVariantId: z.string().uuid().optional(), // More complex to handle variant changes
}).refine(data => data.newQuantity !== undefined, {
  message: "At least one field (newQuantity) must be provided for update.",
  path: ['newQuantity'],
}) satisfies z.ZodSchema<UpdateCartItemInput>; // Add refined type assertion

// Schema for removing an item from the cart
export const RemoveItemFromCartInputSchema = z.object({
  productId: z.string().uuid("Invalid product ID format."),
  variantId: z.string().uuid("Invalid variant ID format.").optional(),
}) satisfies z.ZodSchema<RemoveItemFromCartInput>;

// Schema for applying a coupon
export const ApplyCouponInputSchema = z.object({
  couponCode: z.string().min(1, "Coupon code cannot be empty."),
}) satisfies z.ZodSchema<ApplyCouponInput>;

// Schema for updating cart details (shipping method, notes)
export const UpdateCartDetailsInputSchema = z.object({
  shippingMethod: z.string().min(1, "Shipping method cannot be empty.").optional(),
  notes: z.string().optional(),
}).refine(data => data.shippingMethod !== undefined || data.notes !== undefined, {
    message: "At least one field (shippingMethod, notes) must be provided for update.",
    path: ['shippingMethod', 'notes']
}) satisfies z.ZodSchema<UpdateCartDetailsInput>;