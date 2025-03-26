/* import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
import * as schema from '@/db/schema.js';

const connectionString = process.env.DATABASE_URL as string;

const client = postgres(connectionString);

export const db = drizzle(client, { schema }); */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema.js';
const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString, { max: 1 });
export const db = drizzle(sql, { schema });
