import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users, products, orders, carts } from './schema'; // Import your schema
import 'dotenv/config'; // Load environment variables from .env

const app = express();
app.use(express.json());

const DATABASE_URL = process.env.DATABASE_URL || 4000; // Fallback to 4000 if PORT is not set

// Database connection
const pool = new Pool({
  connectionString:  DATABASE_URL || 4000
});

const db = drizzle(pool);

// Example route: Get all users
app.get('/users', async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Example route: Create a product
app.post('/products', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = await db.insert(products).values({ name, description, price }).returning();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});