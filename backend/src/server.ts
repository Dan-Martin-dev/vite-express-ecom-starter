import dotenv from 'dotenv';
import { createApp } from './app.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = createApp();

export const startServer = () => {
  return app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    // 2025: Add OpenTelemetry logging here
  });
};

// For testing/controlled startup
if (process.env.NODE_ENV !== 'test') {
  startServer();
}