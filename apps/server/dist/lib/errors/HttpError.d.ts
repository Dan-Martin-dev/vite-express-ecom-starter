/**
 * Custom error class for HTTP errors.
 * Includes an HTTP status code along with the error message.
 */
export declare class HttpError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
