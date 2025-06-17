// src/config.ts (Example)
export const config = {
    pocketbaseUrl: process.env.POCKETBASE_URL || '',
    pocketbaseAdminEmail: process.env.POCKETBASE_ADMIN_EMAIL || '',
    pocketbaseAdminPassword: process.env.POCKETBASE_ADMIN_PASSWORD || '',
    // Add other config vars (JWT secret for backend sessions if needed, etc.)
};