import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
/**
 * Middleware factory to validate request body against a Zod schema.
 * Accepts any Zod schema (including objects, effects, etc.).
 * @param schema The Zod schema to validate against.
 * @returns Express middleware function.
 */
export declare const validateRequestBody: (schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
