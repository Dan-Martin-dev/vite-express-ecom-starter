import dotenv from 'dotenv';
import pkg from 'pg'; // Default import from pg package
const { Pool } = pkg; 

dotenv.config(); // Load environment variables

// Configure the database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use DATABASE_URL directly
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // For production use with SSL (if required)
  });

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release();
});

export default pool;
