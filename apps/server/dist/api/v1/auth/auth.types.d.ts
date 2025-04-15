import { z } from 'zod';
export declare const UserCreateSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    passwordConfirm: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    passwordConfirm: string;
}, {
    email: string;
    password: string;
    passwordConfirm: string;
}>, {
    email: string;
    password: string;
    passwordConfirm: string;
}, {
    email: string;
    password: string;
    passwordConfirm: string;
}>;
export type UserCreateData = z.infer<typeof UserCreateSchema>;
export declare const UserLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type UserLoginData = z.infer<typeof UserLoginSchema>;
export interface AuthenticatedUser {
    id: string;
    email: string;
    created: string;
    updated: string;
}
export interface PocketBaseAuthResponse {
    token: string;
    record: AuthenticatedUser;
}
