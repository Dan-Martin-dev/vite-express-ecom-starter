import { ZodError } from 'zod'; // Import z
import { HttpError } from '../lib/errors/HttpError.js';
/**
 * Middleware factory to validate request body against a Zod schema.
 * Accepts any Zod schema (including objects, effects, etc.).
 * @param schema The Zod schema to validate against.
 * @returns Express middleware function.
 */
export const validateRequestBody = (schema) => // Changed AnyZodObject to z.Schema
 async (req, res, next) => {
    try {
        // Parse and validate the request body
        req.body = await schema.parseAsync(req.body);
        next(); // Validation successful, proceed to the next middleware/handler
    }
    catch (error) {
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
        }
        else {
            // Pass other unexpected errors to the global error handler
            next(new HttpError(500, 'Internal Server Error during validation.'));
        }
    }
};
/**
 * Middleware factory to validate request query parameters against a Zod schema.
 * Accepts any Zod schema (including objects, effects, etc.).
 * Note: Query params are typically strings, Zod's z.coerce is useful here.
 * @param schema The Zod schema to validate against (typically a ZodObject).
 * @returns Express middleware function.
 */
export const validateQueryParams = (schema) => // Accept any Zod schema
 async (req, res, next) => {
    try {
        // Parse and validate the request query
        // Use schema.parseAsync to handle async refinements if any
        // Pass req.query as is, Zod's z.coerce handles string to number/boolean
        req.query = await schema.parseAsync(req.query);
        next(); // Validation successful, proceed
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            res.status(400).json({
                message: 'Validation failed for query parameters',
                errors: errors,
            });
        }
        else {
            next(new HttpError(500, 'Internal Server Error during query validation.'));
        }
    }
};
//# sourceMappingURL=validation.middleware.js.map