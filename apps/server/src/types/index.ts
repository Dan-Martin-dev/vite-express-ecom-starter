import { pgEnum } from "drizzle-orm/pg-core";
import { RecordModel } from "pocketbase";

// Types
declare global {
  namespace Express {
    interface Request {
      user?: RecordModel; // The PocketBase user record added by your auth middleware
      token?: string;    // The auth token added by your auth middleware
      sessionId?: string; // The session ID added by your new session middleware
    }
  }
}
export type ShippingAddress = {
  id: string; // Added ID field
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  state?: string;
  phoneNumber?: string;
  isDefault?: boolean;
};
/* 


export type PaymentResult = {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
  provider: string;
};

export type CartItem = {
  productId: string;
  name: string; 
  slug: string;
  image: string;
  price: number;
  qty: number;
  attributes?: Record<string, string>;
};

export type AdapterAccountType = 'oauth' | 'email' | 'credentials';

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
 */
export class AppError extends Error {
  status: number;
  isOperational: boolean;

  constructor(
    message: string, 
    status: number = 500, 
    isOperational: boolean = true
  ) {
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
  static badRequest(message: string = 'Bad Request') {
    return new AppError(message, 400);
  }

  static unauthorized(message: string = 'Unauthorized') {
    return new AppError(message, 401);
  }

  static forbidden(message: string = 'Forbidden') {
    return new AppError(message, 403);
  }

  static notFound(message: string = 'Not Found') {
    return new AppError(message, 404);
  }

  static internalServer(message: string = 'Internal Server Error') {
    return new AppError(message, 500, false);
  }
}

export {};
