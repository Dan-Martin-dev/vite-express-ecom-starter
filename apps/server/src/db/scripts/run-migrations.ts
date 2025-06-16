// For apps/server/src/db/scripts/run-migrations.ts
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '../index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsFolder = path.join(__dirname, '..', '..', 'db', 'migrations');

async function runMigrations() {
  try {
    console.log('Running database migrations...');
    
    await migrate(db, { 
      migrationsFolder
    });
    
    console.log('✅ Database migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();