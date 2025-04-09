// src/features/auth/auth.routes.ts
import express, { Request, Response, NextFunction } from 'express';
import { pb, ensurePbAdminAuth } from "@/lib/pocketbase.js"
import { isAuthenticated } from '@/middleware/auth.middleware.js';
import { db } from '@/db/index.js';
import * as schema from '@/db/schema.js'
import { eq } from 'drizzle-orm';
import crypto from 'crypto'; // For generating address IDs if needed
import { ShippingAddress } from '@/types/index.js';

// Call this when setting up routes or server
ensurePbAdminAuth(); // Attempt admin authentication on startup


const router = express.Router();

// --- Input Validation (Placeholder - Use Zod or similar) ---
const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    // Your validation logic here
    next();
};
const registerSchema = {}; // Define Zod schema
const loginSchema = {}; // Define Zod schema
const updateProfileSchema = {}; // Define Zod schema
const passwordChangeSchema = {}; // Define Zod schema
const addressSchema = {}; // Define Zod schema

router.post('/auth/register', validate(registerSchema), async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, passwordConfirm, name, ...otherData } = req.body;

    if (!email || !password || !passwordConfirm) {
        return res.status(400).json({ message: 'Email, password, and password confirmation are required.' });
    }
    if (password !== passwordConfirm) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
        // Data to send to PocketBase user creation
        const data = {
            email,
            password,
            passwordConfirm,
            emailVisibility: false, // Default
            name: name || '',
            ...otherData // Include any other custom fields defined in your PocketBase 'users' collection
        };

        // Use Admin SDK to create the user in PocketBase
        const newUser = await pb.collection('users').create(data);

        // --- Sync with your Drizzle `users` table (IMPORTANT) ---
        // Create a corresponding user in your PostgreSQL DB using Drizzle
        // You might want only essential info here, linking via PocketBase ID or email
        try {
            await db.insert(schema.users).values({
                id: newUser.id, // Use PocketBase ID as primary key in Drizzle (RECOMMENDED)
                email: newUser.email,
                name: newUser.name || 'NO_NAME', // Match PB data
                role: 'user', // Default role
                // Add other fields as needed, potentially from newUser object
            });
            console.log(`User ${newUser.id} synced to local DB.`);
        } catch (dbError) {
            // Handle DB sync error - maybe log it, maybe try to delete the PB user? (complex)
            console.error(`Failed to sync PocketBase user ${newUser.id} to local DB:`, dbError);
            // Depending on strategy, you might want to inform the user or just log
        }

        // Optional: Request email verification immediately after creation
        try {
            await pb.collection('users').requestVerification(email);
        } catch (verifyError) {
            console.error(`Failed to send verification email to ${email} after registration:`, verifyError);
            // Log this but don't fail the registration
        }

        // Don't return password hashes etc.
        const { password: _p, passwordConfirm: _pc, ...safeUser } = data;
        res.status(201).json({ ...newUser, message: 'Registration successful. Please check your email for verification.' });

    } catch (error: any) {
        console.error("Registration Error:", error?.response || error)
        // PocketBase often returns detailed errors in error.response.data
        const message = error?.response?.message || 'Registration failed.';
        const details = error?.response?.data || {};
        res.status(error?.response?.status || 400).json({ message, details });
    }
});

router.post('/auth/login', validate(loginSchema), async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Authenticate using PocketBase SDK (non-admin auth)
        const authData = await pb.collection('users').authWithPassword(email, password);

        // --- Optional: Update lastLoginAt in your Drizzle DB ---
        try {
             if(authData.record?.id) {
                await db.update(schema.users)
                   .set({ lastLoginAt: new Date() })
                   .where(eq(schema.users.id, authData.record.id)); // Assumes ID sync
             }
        } catch (dbError) {
            console.error(`Failed to update lastLoginAt for user ${authData.record?.id}:`, dbError);
            // Log but don't fail login
        }

        // Respond with the token and user record (client needs to store the token)
        res.json({
            token: authData.token,
            user: authData.record // PocketBase user record
        });

    } catch (error: any) {
         console.error("Login Error:", error?.response || error)
         const message = error?.response?.message || 'Login failed.';
        // Pocketbase returns 400 for failed auth attempt usually
        res.status(error?.response?.status || 400).json({ message });
    }
});

router.post('/auth/logout', (req: Request, res: Response) => {
    // PocketBase tokens are typically stateless JWTs. Logout means the client discards the token.
    // If using `pb.authStore.loadFromCookie` middleware, you might clear the cookie here.
    // res.clearCookie('pb_auth'); // Requires cookie-parser
    pb.authStore.clear(); // Clear any potentially loaded token in the *server's* authStore instance
    res.status(200).json({ message: 'Logged out successfully.' });
});

router.get('/auth/session', isAuthenticated, (req: Request, res: Response) => {
    // isAuthenticated middleware attaches the verified PocketBase user model to req.user
    res.json({ user: req.user, token: req.token }); // Return user data and potentially refreshed token
});

router.post('/auth/refresh', (req: Request, res: Response) => {
    res.status(501).json({ message: 'Token refresh is typically handled automatically by PocketBase SDKs or during token verification. This endpoint is usually not required.' });
});


router.post('/api/v1/auth/verify-email', (req: Request, res: Response) => {
     res.status(501).json({ message: 'Email verification link is handled by PocketBase or your frontend, not typically this backend endpoint.' });
     // If you need to *trigger* sending the verification email again:
     // Requires Admin SDK: await pb.collection('users').requestVerification('user_email@example.com');
});

router.post('/auth/request-password-reset', async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }
    try {
        // Use Admin SDK or non-admin (depends on PB rules)
        await pb.collection('users').requestPasswordReset(email);
        res.status(200).json({ message: 'If an account exists for this email, a password reset link has been sent.' });
    } catch (error: any) {
         console.error("Password Reset Request Error:", error?.response || error)
         // Don't reveal if email exists - send generic success message anyway for security
        res.status(200).json({ message: 'If an account exists for this email, a password reset link has been sent.' });
        // next(error); // Or just log internally
    }
});

router.post('/auth/reset-password', (req: Request, res: Response) => {
    const { token, password, passwordConfirm } = req.body;
     res.status(501).json({ message: 'Password reset confirmation is handled by PocketBase or your frontend using the token from the email link.' });
     // If proxying: Requires Admin SDK: await pb.collection('users').confirmPasswordReset(token, password, passwordConfirm);
});






export default router; // Export the router