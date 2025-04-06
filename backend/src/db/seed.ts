import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema_original.js';

const connectionString = process.env.DATABASE_URL!;

// Single connection (avoids pooling issues during seeding)
const sql = postgres(connectionString, { max: 1 });
export const seedDb = drizzle(sql, { schema });