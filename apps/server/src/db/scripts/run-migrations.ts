// For apps/server/src/db/scripts/run-migrations.ts
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '../index.js';
import path from 'path';

async function runMigrations() {
  try {
    console.log('Running database migrations...');
    
    await migrate(db, { 
      migrationsFolder: path.resolve(__dirname, '../migrations')
    });
    
    console.log('✅ Database migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();