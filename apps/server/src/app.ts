//apps/server/src/app.ts
  import cors from 'cors';
  import helmet from 'helmet';
  import routes from './api/v1/index.js';
  import { errorHandler } from './middleware/error-handler.js';
  import cookieParser from 'cookie-parser';
  import express, { Express } from 'express'; // Import the Express type

  export const createApp = (): Express => {
    const app = express(); 

    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use('/api', routes);

    app.use(errorHandler);

    return app;
  };