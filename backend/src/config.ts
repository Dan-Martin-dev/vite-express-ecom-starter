// src/config.ts (Example)
import dotenv from 'dotenv';
dotenv.config();

export const config = {
    pocketbaseUrl: process.env.POCKETBASE_URL || 'http://127.0.0.1:8090',
    pocketbaseAdminEmail: process.env.POCKETBASE_ADMIN_EMAIL || '',
    pocketbaseAdminPassword: process.env.POCKETBASE_ADMIN_PASSWORD || '',
    // Add other config vars (JWT secret for backend sessions if needed, etc.)
};