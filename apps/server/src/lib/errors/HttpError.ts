// src/lib/errors/HttpError.ts
export class HttpError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'HttpError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }
    }

    // Static factory methods
    static badRequest(message: string = "Bad Request"): HttpError {
        return new HttpError(400, message);
    }

    static unauthorized(message: string = "Unauthorized"): HttpError {
        return new HttpError(401, message);
    }

    static forbidden(message: string = "Forbidden"): HttpError {
        return new HttpError(403, message);
    }

    static notFound(message: string = "Not Found"): HttpError {
        return new HttpError(404, message);
    }
    // ... other common types
}