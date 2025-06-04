// src/features/auth/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service.js';

export const authController = {
    async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            // Input validation should be done by middleware before this point
            const { email, password, passwordConfirm } = req.body;
            if (!email || !password || !passwordConfirm) {
                 return res.status(400).json({ message: 'Email, password, and password confirmation are required.' });
            }
             if (password !== passwordConfirm) {
                 return res.status(400).json({ message: 'Passwords do not match.' });
            }

            const result = await authService.registerUser(req.body);
            // Send response based on service result
            return res.status(201).json(result); // FIX: Added return

        } catch (error: any) {
             // Pass error to global error handler
             // Log the specific controller context if desired
             console.error("Auth Controller Register Error:", error.message);
             next(error);
             // This path will implicitly lead to Promise<void>
        }
    },

    async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required.' });
            }

            const result = await authService.loginUser({ email, password });
            return res.status(200).json(result); // FIX: Added return
        } catch (error: any) {
             console.error("Auth Controller Login Error:", error.message);
             next(error);
             // This path will implicitly lead to Promise<void>
        }
    },

    logout(_req: Request, res: Response, next: NextFunction): Response | void {
        try {
            // Primarily a client-side action, but clear server store if needed.
            authService.clearServerAuthStore();
            // If using httpOnly cookies for auth, clear them here:
            // res.clearCookie('pb_auth'); // Requires cookie-parser middleware
            return res.status(200).json({ message: 'Logged out successfully.' }); // FIX: Added return
        } catch (error) {
             next(error);
             // This path will implicitly lead to void return
        }
    },

    getSession(req: Request, res: Response, _next: NextFunction): Response | void { // FIX: _next for unused param
        // isAuthenticated middleware already validated and attached user/token
        if (!req.user) {
            // This shouldn't happen if isAuthenticated middleware is working correctly
            return res.status(401).json({ message: 'Authentication required.' });
        }
         return res.status(200).json({ user: req.user, token: req.token }); // FIX: Added return
    },

    async requestPasswordReset(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
         try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: 'Email is required.' });
            }
            const result = await authService.requestPasswordReset(email);
            return res.status(200).json(result); // FIX: Added return // Send generic success message from service
        } catch (error: any) {
             console.error("Auth Controller Password Reset Request Error:", error.message);
             next(error);
             // This path will implicitly lead to Promise<void>
        }
    },

     // --- Placeholder endpoints mentioned in original code ---

     // Token refresh is handled by PocketBase SDK / isAuthenticated middleware usually
     refresh(_req: Request, res: Response): Response { // FIX: _req if not used, added return
        return res.status(501).json({ message: 'Token refresh is typically handled automatically. This endpoint is usually not required.' });
     },

      // Email verification link click is handled by PB/Frontend
     verifyEmail(_req: Request, res: Response): Response { // FIX: _req if not used, added return
        return res.status(501).json({ message: 'Email verification link is handled by PocketBase or your frontend.' });
     },

      // Password reset confirmation is handled by PB/Frontend via link token
     resetPassword(_req: Request, res: Response): Response { // FIX: _req if not used, added return
        return res.status(501).json({ message: 'Password reset confirmation is handled by PocketBase or your frontend using the token from the email link.' });
     }
};