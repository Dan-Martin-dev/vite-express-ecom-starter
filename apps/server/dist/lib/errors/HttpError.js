// src/lib/errors/HttpError.ts
export class HttpError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'HttpError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }
    }
    // Static factory methods
    static badRequest(message = "Bad Request") {
        return new HttpError(400, message);
    }
    static unauthorized(message = "Unauthorized") {
        return new HttpError(401, message);
    }
    static forbidden(message = "Forbidden") {
        return new HttpError(403, message);
    }
    static notFound(message = "Not Found") {
        return new HttpError(404, message);
    }
}
//# sourceMappingURL=HttpError.js.map