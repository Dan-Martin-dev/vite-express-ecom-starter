export declare class HttpError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
    static badRequest(message?: string): HttpError;
    static unauthorized(message?: string): HttpError;
    static forbidden(message?: string): HttpError;
    static notFound(message?: string): HttpError;
}
