import { z } from 'zod';
export declare const EmailSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const addressSchema: z.ZodObject<{
    fullName: z.ZodString;
    address: z.ZodString;
    city: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
    state: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    isDefault: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber?: string | undefined;
    isDefault?: boolean | undefined;
    state?: string | undefined;
}, {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber?: string | undefined;
    isDefault?: boolean | undefined;
    state?: string | undefined;
}>;
export declare const updateProfileSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phoneNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    preferences: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    marketingOptIn: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    defaultPaymentMethod: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    image?: string | undefined;
    phoneNumber?: string | undefined;
    bio?: string | undefined;
    preferences?: Record<string, any> | undefined;
    defaultPaymentMethod?: string | undefined;
    marketingOptIn?: boolean | undefined;
}, {
    name?: string | undefined;
    image?: string | undefined;
    phoneNumber?: string | undefined;
    bio?: string | undefined;
    preferences?: Record<string, any> | undefined;
    defaultPaymentMethod?: string | undefined;
    marketingOptIn?: boolean | undefined;
}>;
