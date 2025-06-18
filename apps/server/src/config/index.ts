// Fix the config module to handle environment variables properly
export const config = {
  // Database config
  db: {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || '',
    url: process.env.DATABASE_URL || '',
  },
  
  // Server config
  server: {
    port: parseInt(process.env.PORT || process.env.APP_SERVER_PORT || '4000', 10),
    env: process.env.NODE_ENV || 'development',
  },
  
  // PocketBase config
  pocketbaseUrl: process.env.POCKETBASE_URL || 'http://localhost:8090',
  pocketbaseAdminEmail: process.env.POCKETBASE_ADMIN_EMAIL || '',
  pocketbaseAdminPassword: process.env.POCKETBASE_ADMIN_PASSWORD || '',
  
  // Debug flag - useful for logging sensitive info in development
  isDebug: process.env.NODE_ENV === 'development',
};

// Debug function for development
export function debugConfig() {
  if (config.isDebug) {
    console.log('--- ENV DEBUG INFO (DEV ONLY) ---');
    console.log(`DB_USER: [${config.db.user}]`);
    console.log(`DB_PASSWORD: [${'*'.repeat(8)}]`);
    console.log(`DB_NAME: [${config.db.name}]`);
    console.log(`POCKETBASE_URL: [${config.pocketbaseUrl}]`);
    console.log(`DATABASE_URL: [PostgreSQL connection string hidden]`);
    console.log('--- END DEBUG INFO ---');
  }
}