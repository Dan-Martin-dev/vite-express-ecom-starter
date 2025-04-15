import { Request, Response, NextFunction } from 'express';
export declare const authController: {
    register(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    login(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    logout(req: Request, res: Response, next: NextFunction): void;
    getSession(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
    requestPasswordReset(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    refresh(req: Request, res: Response): void;
    verifyEmail(req: Request, res: Response): void;
    resetPassword(req: Request, res: Response): void;
};
