import { Request, Response, NextFunction } from 'express';
import { RecordModel } from 'pocketbase';
declare global {
    namespace Express {
        interface Request {
            user?: RecordModel | null;
            token?: string;
        }
    }
}
export declare const isAuthenticated: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
