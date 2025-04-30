import { Request, Response, NextFunction } from 'express';
import { isAuthenticated } from '@/middleware/auth.middleware.js';
import { randomUUID } from 'crypto';

/**
 * Middleware to ensure a cart can be identified either by an authenticated user
 * or by a session ID. Attaches `req.user` (if authenticated) or `req.sessionId`.
 * Creates a session ID cookie if none exists for a guest.
 */
export const identifyCart = [
    isAuthenticated, // Run optional auth check first, attaches req.user if logged in
    (req: Request, res: Response, next: NextFunction) => {
        if (req.user) {
            // User is logged in, identifier is req.user.id
            // Clear session cookie if it exists? Optional.
             // res.clearCookie('sessionId');
            return next();
        }

        // User is not logged in, check/set session ID
        let sessionId = req.cookies?.sessionId || req.headers['x-session-id'] as string;

        if (!sessionId) {
            sessionId = randomUUID();
            // Set cookie for guest session tracking
            res.cookie('sessionId', sessionId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use 'true' in production (HTTPS)
                sameSite: 'lax', // Or 'strict' or 'none' depending on needs
                maxAge: 30 * 24 * 60 * 60 * 1000 // Example: 30 days
            });
            console.log(`New session ID generated: ${sessionId}`);
        }

        // Attach sessionId to request for downstream handlers
        req.sessionId = sessionId;
        next();
    }
];
