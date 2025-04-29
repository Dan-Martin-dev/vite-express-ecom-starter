import { RecordModel } from "pocketbase";
declare global {
    namespace Express {
        interface Request {
            user?: RecordModel;
            token?: string;
            sessionId?: string;
        }
    }
}
export type ShippingAddress = {
    id: string;
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    state?: string;
    phoneNumber?: string;
    isDefault?: boolean;
};
export declare class AppError extends Error {
    status: number;
    isOperational: boolean;
    constructor(message: string, status?: number, isOperational?: boolean);
    static badRequest(message?: string): AppError;
    static unauthorized(message?: string): AppError;
    static forbidden(message?: string): AppError;
    static notFound(message?: string): AppError;
    static internalServer(message?: string): AppError;
}
export {};
