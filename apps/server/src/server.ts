//apps/server/src/server.ts
import dotenv from 'dotenv';
import { createApp } from './app.js';
import { ensurePbAdminAuth } from './lib/pocketbase.js';

dotenv.config();

const port = process.env.PORT || 4000; 
const app = createApp();

export const startServer = () => {
  if (!port) {
    console.error('Error: Port is not defined. Set the PORT environment variable or provide a default.');
    process.exit(1);
  }
  
  // Start server and initialize PocketBase
  const server = app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    
    // Initialize PocketBase connection
    try {
      console.log('Authenticating PocketBase Admin...');
      const success = await ensurePbAdminAuth();
      if (success) {
        console.log('PocketBase Admin authenticated successfully.');
      } else {
        console.warn('PocketBase authentication failed. Some features may not work correctly.');
      }
    } catch (error) {
      console.error('Error connecting to PocketBase:', error);
    }
  });
  
  return server;
};

