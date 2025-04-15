export type ShippingAddress = {
    id: string;
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    state?: string;
    phoneNumber?: string;
    isDefault?: boolean;
};
export type PaymentResult = {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
    provider: string;
};
export type CartItem = {
    productId: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    qty: number;
    attributes?: Record<string, string>;
};
export type AdapterAccountType = 'oauth' | 'email' | 'credentials';
export declare const orderStatusEnum: import("drizzle-orm/pg-core").PgEnum<["pending", "processing", "shipped", "delivered", "cancelled", "refunded"]>;
export declare const paymentStatusEnum: import("drizzle-orm/pg-core").PgEnum<["pending", "completed", "failed", "refunded", "partially_refunded"]>;
export declare const userRoleEnum: import("drizzle-orm/pg-core").PgEnum<["admin", "user", "staff", "vendor"]>;
export declare class AppError extends Error {
    status: number;
    isOperational: boolean;
    constructor(message: string, status?: number, isOperational?: boolean);
    static badRequest(message?: string): AppError;
    static unauthorized(message?: string): AppError;
    static forbidden(message?: string): AppError;
    static notFound(message?: string): AppError;
    static internalServer(message?: string): AppError;
}
