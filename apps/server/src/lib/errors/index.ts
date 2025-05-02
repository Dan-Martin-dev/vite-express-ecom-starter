      
// apps/server/src/lib/errors/index.ts

// Re-export your custom error classes from their individual files
export { AppError } from './AppError.js';
export { ConflictError } from './ConflictError.js';
export { NotFoundError } from './NotFoundError.js';
export { HttpError } from './HttpError.js'; // Assuming you have this HttpError class

    