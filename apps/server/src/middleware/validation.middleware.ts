import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod'; // Import z
import { HttpError } from '@/lib/errors/HttpError.js';

/**
 * Middleware factory to validate request body against a Zod schema.
 * Accepts any Zod schema (including objects, effects, etc.).
 * @param schema The Zod schema to validate against.
 * @returns Express middleware function.
 */
export const validateRequestBody = (schema: z.Schema) => // Changed AnyZodObject to z.Schema
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Parse and validate the request body
            req.body = await schema.parseAsync(req.body);
            next(); // Validation successful, proceed to the next middleware/handler
        } catch (error) {
            if (error instanceof ZodError) {
                // Format Zod errors for a user-friendly response
                const errors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                // Use HttpError or send response directly
                // next(new HttpError(400, 'Validation failed', { details: errors }));
                res.status(400).json({
                    message: 'Validation failed',
                    errors: errors,
                });
            } else {
                // Pass other unexpected errors to the global error handler
                next(new HttpError(500, 'Internal Server Error during validation.'));
            }
        }
    };

// Example usage in routes:
// import { validateRequestBody } from './validation.middleware';
// import { UserCreateSchema } from '../features/auth/auth.types';
// router.post('/register', validateRequestBody(UserCreateSchema), authController.register);
