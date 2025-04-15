import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/index.js';
export declare const errorHandler: (err: Error | AppError, req: Request, res: Response, next: NextFunction) => void;
