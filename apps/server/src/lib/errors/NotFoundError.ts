// src/lib/errors/NotFoundError.ts (assuming this path)

import { AppError } from './AppError.js';

/**
 * Error specifically for resources that were not found.
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found.', isOperational: boolean = true) {
    super(message, 404, isOperational);
    this.name = 'NotFoundError'; // Explicitly set name
    Object.setPrototypeOf(this, NotFoundError.prototype); // Restore prototype chain
  }
}