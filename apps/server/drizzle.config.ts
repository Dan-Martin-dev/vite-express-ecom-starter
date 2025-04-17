// drizzle.config.ts
import type { Config } from "drizzle-kit";
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: "./src/db/schema/**/*.ts", // <--- CHANGE THIS LINE
  out: "./src/db/migrations",
  dialect: "postgresql", // Added dialect
  // driver: 'pg', // Removed driver as it conflicts with dialect
  // dbCredentials: { // Removed dbCredentials again
  //   connectionString: process.env.DATABASE_URL as string,
  // },
  url: process.env.DATABASE_URL as string, // Use top-level url property again
} as Config; // Keep explicit cast
