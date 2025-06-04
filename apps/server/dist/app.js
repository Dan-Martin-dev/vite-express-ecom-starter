//apps/server/src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './api/v1/index.js';
import { errorHandler } from './middleware/error-handler.js';
import cookieParser from 'cookie-parser';
export const createApp = () => {
    const app = express();
    // Core middleware
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    // API routes
    app.use('/api', routes);
    // Error handling (must be last!)
    app.use(errorHandler);
    return app;
};
//# sourceMappingURL=app.js.map