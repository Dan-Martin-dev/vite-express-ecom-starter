// src/middleware/error-handler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/index.js';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = 'status' in err ? err.status : 500;
  const message = err.message || 'Something went wrong';

  console.error(`[ERROR] ${status}: ${message}`);
  
  res.status(status).json({
    status,
    message
  });
};
