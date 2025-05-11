import { z } from 'zod';
export declare const CreateOrderInputSchema: z.ZodObject<{
    shippingAddress: z.ZodObject<{
        fullName: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        state: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        state?: string | undefined;
    }, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        state?: string | undefined;
    }>;
    billingAddress: z.ZodOptional<z.ZodObject<{
        fullName: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        state: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        state?: string | undefined;
    }, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        state?: string | undefined;
    }>>;
    paymentMethod: z.ZodString;
}, "strip", z.ZodTypeAny, {
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        state?: string | undefined;
    };
    paymentMethod: string;
    billingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        state?: string | undefined;
    } | undefined;
}, {
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        state?: string | undefined;
    };
    paymentMethod: string;
    billingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        state?: string | undefined;
    } | undefined;
}>;
export declare const GetOrderByIdInputSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const GetUserOrdersInputSchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    offset: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["createdAt", "totalPrice", "status"]>>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sortOrder: "asc" | "desc";
    limit: number;
    offset: number;
    sortBy: "createdAt" | "status" | "totalPrice";
    status?: string | undefined;
}, {
    status?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sortBy?: "createdAt" | "status" | "totalPrice" | undefined;
}>;
