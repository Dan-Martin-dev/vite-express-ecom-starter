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
// Zod schema for login data validation
export const UserLoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password cannot be empty" }), // Basic check, PB handles complexity
});
//# sourceMappingURL=auth.types.js.map