import { pgEnum } from "drizzle-orm/pg-core";
// Enums
export const orderStatusEnum = pgEnum('order_status', [
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
]);
export const paymentStatusEnum = pgEnum('payment_status', [
    'pending',
    'completed',
    'failed',
    'refunded',
    'partially_refunded'
]);
export const userRoleEnum = pgEnum('user_role', ['admin', 'user', 'staff', 'vendor']);
export class AppError extends Error {
    status;
    isOperational;
    constructor(message, status = 500, isOperational = true) {
        super(message);
        // Ensures the correct prototype chain is maintained
        Object.setPrototypeOf(this, AppError.prototype);
        this.name = this.constructor.name;
        this.status = status;
        this.isOperational = isOperational;
        // Captures the stack trace, excluding the constructor call from it
        Error.captureStackTrace(this, this.constructor);
    }
    // Optional: Method to create common error types
    static badRequest(message = 'Bad Request') {
        return new AppError(message, 400);
    }
    static unauthorized(message = 'Unauthorized') {
        return new AppError(message, 401);
    }
    static forbidden(message = 'Forbidden') {
        return new AppError(message, 403);
    }
    static notFound(message = 'Not Found') {
        return new AppError(message, 404);
    }
    static internalServer(message = 'Internal Server Error') {
        return new AppError(message, 500, false);
    }
}
//# sourceMappingURL=index.js.map