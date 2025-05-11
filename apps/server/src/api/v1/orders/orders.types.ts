// apps/server/src/api/v1/orders/orders.types.ts

import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { orders as ordersSchema, orderItems as orderItemsSchema } from '@/db/schema/orders.schema.js';
// Assuming ShippingAddress is a shared type, import if needed
// import { ShippingAddress } from '@/types/index.js';
// Import enums if they are defined globally, otherwise define/import locally
// import { orderStatusEnum, paymentStatusEnum } from '@/types/index.js';

// --- Database Models (Derived from Drizzle Schema) ---
export type DBOrder = InferSelectModel<typeof ordersSchema>;
export type NewOrder = InferInsertModel<typeof ordersSchema>;
export type DBOrderItem = InferSelectModel<typeof orderItemsSchema>;
export type NewOrderItem = InferInsertModel<typeof orderItemsSchema>;

// --- Types for JSONB Fields ---
// Re-declare or import types used in JSONB columns if not already globally available
// Example: Assuming ShippingAddress and PaymentResult are defined elsewhere or like this:
export interface ShippingAddress { // Or import from '@/types/index.js'
  id?: string; // Might be reference to saved address or just data
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  state?: string;
  phoneNumber?: string;
}

export interface PaymentResult { // Or import from '@/types/index.js'
  id: string; // Transaction ID from payment provider
  status: string; // Status from provider (e.g., 'COMPLETED', 'PENDING')
  update_time?: string;
  email_address?: string; // Payer email from provider
  provider: string; // e.g., 'stripe', 'paypal'
}

// --- API Output Types ---
// Order details including the associated items
export interface OrderWithItems extends Omit<DBOrder, 'shippingAddress' | 'billingAddress' | 'paymentResult'> {
  // Override JSONB types if needed, otherwise they inherit from DBOrder
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress | null; // Assuming optional billing address
  paymentResult?: PaymentResult | null;
  // Add the relation field name as defined in your orders.schema.ts relations
  items: InferSelectModel<typeof orderItemsSchema>[]; // <--- Corrected property name and type
}

// --- API Input Types ---

// Input for creating a new order
export interface CreateOrderInput {
  // Items are usually derived from the user's cart, not passed directly
  // cartId?: string; // Optional: specify cart ID if not using current user's default
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress; // Optional
  paymentMethod: string; // e.g., 'stripe', 'paypal', 'cod'
  // Payment details (like token) might be handled separately or included here
  // paymentToken?: string; // Example for Stripe
}

// Input for retrieving a single order by ID (usually from path params)
export interface GetOrderByIdInput {
  id: string; // Order ID
}

// Input for retrieving a user's orders (usually from query params)
export interface GetUserOrdersInput {
  limit?: number;
  offset?: number;
  sortBy?: 'createdAt' | 'totalPrice' | 'status';
  sortOrder?: 'asc' | 'desc';
  status?: string; // Filter by order status (e.g., 'pending', 'delivered')
}