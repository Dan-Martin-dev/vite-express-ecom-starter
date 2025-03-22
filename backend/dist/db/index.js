// src/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
// Get the database connection string from environment variables
const connectionString = process.env.DATABASE_URL;
// Create the PostgreSQL connection
const client = postgres(connectionString);
// Create the Drizzle ORM instance
export const db = drizzle(client, { schema });
