// src/db/scripts/pre-migrate.ts
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config(); // Load environment variables (ensure DATABASE_URL is set)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// --- Define the enums we want to ensure exist ---
// We define them here primarily for easy reference within this script.
// The source of truth for Drizzle remains your schema files.
const enumsToCreate = [
  {
    name: 'user_role',
    values: ['admin', 'user', 'staff', 'vendor'],
  },
  {
    name: 'order_status',
    values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
  },
  {
    name: 'payment_status',
    values: ['pending', 'completed', 'failed', 'refunded', 'partially_refunded'],
  },
];
// ---

async function ensureEnumTypes(): Promise<void> {
  let client; // Declare client outside try block for access in finally
  try {
    client = await pool.connect();
    console.log('Connected to database to check/create enums...');

    // Loop through each enum definition
    for (const enumDef of enumsToCreate) {
      const { name, values } = enumDef;

      // Check if the enum type already exists
      const checkResult = await client.query(
        `SELECT 1 FROM pg_type WHERE typname = $1`, // Use parameter binding
        [name]
      );

      if (checkResult.rows.length === 0) {
        // Type does not exist, create it
        // Construct the CREATE TYPE query safely
        const valuesString = values.map(v => `'${v}'`).join(', '); // Quote values
        const createQuery = `CREATE TYPE "${name}" AS ENUM (${valuesString});`; // Ensure type name is quoted if needed

        await client.query(createQuery);
        console.log(`✅ Created "${name}" enum type.`);
      } else {
        // Type already exists
        console.log(`👍 "${name}" enum type already exists.`);
      }
    }

    console.log('Enum check/creation complete.');

  } catch (err) {
    console.error('❌ Error during enum check/creation:', err);
    process.exit(1); // Exit with error code if something fails
  } finally {
    if (client) {
      client.release(); // Release the client back to the pool
      console.log('Database client released.');
    }
    await pool.end(); // Close all connections in the pool
    console.log('Database pool closed.');
  }
}

// Self-invoking async function to run the process
(async (): Promise<void> => {
  await ensureEnumTypes();
})();