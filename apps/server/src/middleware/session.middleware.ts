// src/middleware/session.middleware.ts
import { NotFoundError } from '@/lib/errors/NotFoundError.js';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import 'express'; // Important: import express to augment its types

const SESSION_COOKIE_NAME = 'app_session_id';
const SESSION_COOKIE_OPTIONS = {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production', 
    maxAge: 1000 * 60 * 60 * 24 * 30 // Example: 30 days
};

export const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let sessionId = req.cookies?.[SESSION_COOKIE_NAME];

    if (!sessionId) {
        sessionId = uuidv4();
        res.cookie(SESSION_COOKIE_NAME, sessionId, SESSION_COOKIE_OPTIONS);
    }
    req.sessionId = sessionId;

    next();
};

export const requireSessionId = (req: Request, _res: Response, next: NextFunction) => {
    const sessionId = req.sessionId;

    if (!sessionId) {
      return next(new NotFoundError('Session ID is required'));
    }
    next();
};