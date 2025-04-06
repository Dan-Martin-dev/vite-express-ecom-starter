
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema_original.js';

const connectionString = process.env.DATABASE_URL!;

// Use connection pooling (default max: 10)
const sql = postgres(connectionString, { max: 10 });
export const db = drizzle(sql, { schema });