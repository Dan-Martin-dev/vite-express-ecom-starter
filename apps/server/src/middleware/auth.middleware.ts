// src/middleware/auth.ts (PocketBase Authentication Middleware)
import { Request, Response, NextFunction } from 'express';
import { pb } from '@/lib/pocketbase.js';
/* import { RecordModel } from 'pocketbase' */

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if (!token) {
        // if (authCookie) { try { pb.authStore.loadFromCookie(authCookie); } catch (_) {} }
        req.user = undefined; 
        req.token = undefined;
        return next(); 
    }

    try {
        pb.authStore.save(token, null); // Save token without model data initially

        const refreshedUserData = await pb.collection('users').authRefresh();

        if (!pb.authStore.isValid || !refreshedUserData?.record) {
             pb.authStore.clear(); 
             return res.status(401).json({ message: 'Authentication token invalid or expired.' });
        }

        // Token is valid, attach user data and token to request
        req.user = refreshedUserData.record; // The user model from PocketBase
        req.token = pb.authStore.token; // Use the potentially refreshed token

        next();
    } catch (error: any) {
         pb.authStore.clear(); 
         console.error('Auth middleware error:', error);
         const statusCode = error?.response?.status || 500;
         const message = error?.response?.message || 'Authentication failed.';
         if (statusCode === 401 || statusCode === 403) {
             return res.status(401).json({ message: 'Authentication token invalid or expired.' });
         }
        return res.status(statusCode).json({ message });
    }
};