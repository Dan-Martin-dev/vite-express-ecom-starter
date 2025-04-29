// src/middleware/session.middleware.ts
import { NotFoundError } from '@/lib/errors/NotFoundError.js';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

// --- Add Express Request Type Augmentation ---
// This is needed so TypeScript knows about req.sessionId
import 'express'; // Important: import express to augment its types

const SESSION_COOKIE_NAME = 'app_session_id';
const SESSION_COOKIE_OPTIONS = {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production', // Recommended in production
    maxAge: 1000 * 60 * 60 * 24 * 30 // Example: 30 days
};

// This middleware ensures req.sessionId is set
export const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let sessionId = req.cookies?.[SESSION_COOKIE_NAME];

    if (!sessionId) {
        // No session ID found in cookies, generate a new one
        sessionId = uuidv4();
        // Set the cookie in the response so the browser remembers it
        // You might want to add domain/path/sameSite options depending on your setup
        res.cookie(SESSION_COOKIE_NAME, sessionId, SESSION_COOKIE_OPTIONS);
    }

    // Attach the session ID to the request object
    // The type augmentation above makes this property known to TypeScript
    req.sessionId = sessionId;

    next();
};

// This middleware requires that req.sessionId HAS BEEN set (by sessionMiddleware)
export const requireSessionId = (req: Request, res: Response, next: NextFunction) => {
    // Check the session ID attached to the request by sessionMiddleware
    const sessionId = req.sessionId;

    if (!sessionId) {
      // If sessionMiddleware ran but didn't set req.sessionId, something is wrong.
      // Or if this middleware is run BEFORE sessionMiddleware (incorrect order).
      // Or if the client cleared cookies before making a request to a protected route.
      // Throw an error indicating the requirement wasn't met.
      // Using NotFoundError here matches your original code, but Unauthorized/Forbidden might also fit.
      return next(new NotFoundError('Session ID is required'));
    }

    // Session ID exists on the request object, proceed to the next middleware/route handler
    next();
};