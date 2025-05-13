//apps/server/src/server.ts
import dotenv from 'dotenv';
import { createApp } from './app.js';
dotenv.config();
const port = process.env.PORT || 4000;
const app = createApp();
export const startServer = () => {
    // Add a check to ensure port is valid
    if (!port) {
        console.error('Error: Port is not defined. Set the PORT environment variable or provide a default.');
        process.exit(1); // Exit if port configuration is missing
    }
    return app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        // 2025: Add OpenTelemetry logging here
    });
};
//# sourceMappingURL=server.js.map