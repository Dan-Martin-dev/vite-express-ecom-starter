// src/lib/errors/ConflictError.ts (assuming this path)

import { AppError } from './AppError.js';

/**
 * Error specifically for conflicts, like insufficient stock.
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Conflict occurred.', isOperational: boolean = true) {
    super(message, 409, isOperational); // 409 Conflict status code
    this.name = 'ConflictError'; // Explicitly set name
    Object.setPrototypeOf(this, ConflictError.prototype); // Restore prototype chain
  }
}