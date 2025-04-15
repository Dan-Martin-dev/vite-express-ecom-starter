// src/lib/errors/HttpError.ts

/**
 * Custom error class for HTTP errors.
 * Includes an HTTP status code along with the error message.
 */
export class HttpError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message); // Pass message to the base Error class
        this.statusCode = statusCode;
        this.name = 'HttpError'; // Set the error name

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }
    }
}
