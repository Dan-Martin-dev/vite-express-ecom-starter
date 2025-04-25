// src/lib/errors/AppError.ts (assuming this path)

/**
 * Base class for application-specific errors.
 * Allows attaching a status code for HTTP responses.
 */
export class AppError extends Error {
    public readonly name: string;
    public readonly httpStatus: number;
    public readonly isOperational: boolean; // Differentiate between operational errors and programming errors
  
    constructor(message: string, httpStatus: number = 500, isOperational: boolean = true) {
      super(message);
  
      // Restore prototype chain
      Object.setPrototypeOf(this, new.target.prototype);
  
      this.name = this.constructor.name; // e.g., 'AppError'
      this.httpStatus = httpStatus;
      this.isOperational = isOperational; // Mark as operational by default
  
      // Capture stack trace (V8 specific)
      Error.captureStackTrace(this, this.constructor);
    }
  }