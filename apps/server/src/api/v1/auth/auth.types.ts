import { z } from 'zod';

// Zod schema for registration data validation
export const UserCreateSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  passwordConfirm: z.string(),
  // Add other fields if needed, e.g., name: z.string().min(2)
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"], // Path of error
});

// Type inferred from the Zod schema
export type UserCreateData = z.infer<typeof UserCreateSchema>;


// Zod schema for login data validation
export const UserLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password cannot be empty" }), // Basic check, PB handles complexity
});

// Type inferred from the Zod schema
export type UserLoginData = z.infer<typeof UserLoginSchema>;

// You might want a type for the authenticated user data returned by PocketBase
// This depends on your 'users' collection structure
export interface AuthenticatedUser {
    id: string;
    email: string;
    // Add other fields like name, avatar, verified, etc.
    // name?: string;
    // avatar?: string;
    // verified?: boolean;
    created: string;
    updated: string;
}

// Type for the PocketBase auth response (record + token)
export interface PocketBaseAuthResponse {
    token: string;
    record: AuthenticatedUser; // Use a more specific type based on your PB collection
}
