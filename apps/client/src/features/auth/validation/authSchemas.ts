// src/features/auth/validation/authSchemas.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).min(1, { message: 'Password is required' }),
});

export const registerSchema = z.object({
  // name: z.string().min(1, { message: 'Name is required' }), // Add if you collect name on register
  email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).min(1, { message: 'Password is required' }),
  passwordConfirm: z.string().min(1, { message: 'Password confirmation is required' }),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"], // Error applies to the confirmation field
});

export const requestPasswordResetSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
});