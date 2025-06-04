// apps/server/src/api/v1/orders/orders.validators.ts

import { z } from 'zod';
import {
    CreateOrderInput,
    GetOrderByIdInput,
    GetUserOrdersInput,
   /*  ShippingAddress, */ // Assuming this is the correct shape
} from './orders.types.js';

// Define Zod schema for ShippingAddress (reuse if defined globally)
const ShippingAddressSchema = z.object({
    // id: z.string().uuid().optional(), // Optional if referencing saved address
    fullName: z.string().min(1, "Full name is required."),
    address: z.string().min(1, "Address line is required."),
    city: z.string().min(1, "City is required."),
    postalCode: z.string().min(1, "Postal code is required."),
    country: z.string().min(1, "Country is required."),
    state: z.string().optional(),
    phoneNumber: z.string().optional(),
}); // satisfies z.ZodSchema<ShippingAddress>; // Add satisfies if needed

// Schema for validating the request body for creating an order
export const CreateOrderInputSchema = z.object({
    shippingAddress: ShippingAddressSchema,
    billingAddress: ShippingAddressSchema.optional(), // Billing address is optional
    paymentMethod: z.string().min(1, "Payment method is required."),
    // cartId: z.string().uuid().optional(), // Only if explicitly passing cart ID
    // paymentToken: z.string().optional(), // Example if passing payment token
}) satisfies z.ZodSchema<CreateOrderInput>;


// Schema for validating the ID parameter for getting a single order
export const GetOrderByIdInputSchema = z.object({
    id: z.string().uuid("Invalid order ID format."),
}) satisfies z.ZodSchema<GetOrderByIdInput>;


// Schema for validating query parameters for getting user orders
export const GetUserOrdersInputSchema = z.object({
    limit: z.coerce.number().int().positive().optional().default(10),
    offset: z.coerce.number().int().nonnegative().optional().default(0),
    sortBy: z.enum(['createdAt', 'totalPrice', 'status']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
    status: z.string().min(1).optional(), // Validate status if needed (e.g., check against enum values)
}) satisfies z.ZodSchema<GetUserOrdersInput>;