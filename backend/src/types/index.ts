import { carts, orderItems, orders, products, reviews } from '@/db/schema'

export type AppError = {
    status: number;
    message: string;
  };
  
import {
  cartItemSchema,
  paymentResultSchema,
  shippingAddressSchema,
} from '@/lib/validator'
import { InferSelectModel } from 'drizzle-orm'
import { z } from 'zod'

// PRODUCTS
export type Product = InferSelectModel<typeof products>
export type Review = InferSelectModel<typeof reviews> & {
  user?: { name: string }
}

export type ProviderType = "oauth" | "oidc" | "email" | "webauthn" | "other";

export type AdapterAccountType = Extract<
  ProviderType,
  "oauth" | "oidc" | "email" | "webauthn"
>;
export type Category = {
  id: string; // UUID
  name: string;
  slug: string;
  description?: string | null; // Optional
  image?: string | null; // Optional
  icon?: string | null; // Optional
  metaTitle?: string | null; // Optional
  metaDescription?: string | null; // Optional
  parentId?: string | null; // UUID, optional (self-referential)
  displayOrder: number; // Defaults to 0
  isActive: boolean; // Defaults to true
  createdAt: Date; // Timestamp with timezone
  updatedAt: Date; // Timestamp with timezone
};
// CART
export type Cart = InferSelectModel<typeof carts>
export type CartItem = z.infer<typeof cartItemSchema>

export type ShippingAddress = z.infer<typeof shippingAddressSchema>
export type PaymentResult = z.infer<typeof paymentResultSchema>

// ORDERS

export type Order = InferSelectModel<typeof orders> & {
  orderItems: OrderItem[]
  user: { name: string | null; email: string }
}
export type OrderItem = InferSelectModel<typeof orderItems>