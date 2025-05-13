import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { orders as ordersSchema, orderItems as orderItemsSchema } from '../../../db/schema/orders.schema.js';
export type DBOrder = InferSelectModel<typeof ordersSchema>;
export type NewOrder = InferInsertModel<typeof ordersSchema>;
export type DBOrderItem = InferSelectModel<typeof orderItemsSchema>;
export type NewOrderItem = InferInsertModel<typeof orderItemsSchema>;
export interface ShippingAddress {
    id?: string;
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    state?: string;
    phoneNumber?: string;
}
export interface PaymentResult {
    id: string;
    status: string;
    update_time?: string;
    email_address?: string;
    provider: string;
}
export interface OrderWithItems extends Omit<DBOrder, 'shippingAddress' | 'billingAddress' | 'paymentResult'> {
    shippingAddress: ShippingAddress;
    billingAddress?: ShippingAddress | null;
    paymentResult?: PaymentResult | null;
    items: InferSelectModel<typeof orderItemsSchema>[];
}
export interface CreateOrderInput {
    shippingAddress: ShippingAddress;
    billingAddress?: ShippingAddress;
    paymentMethod: string;
}
export interface GetOrderByIdInput {
    id: string;
}
export interface GetUserOrdersInput {
    limit?: number;
    offset?: number;
    sortBy?: 'createdAt' | 'totalPrice' | 'status';
    sortOrder?: 'asc' | 'desc';
    status?: string;
}
