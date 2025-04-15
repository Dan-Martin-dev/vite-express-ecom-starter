
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as auth from './schema/auth.schema.js';
import * as carts from './schema/carts.schema.js';
import * as coupons from './schema/coupons.schema.js';
import * as products from './schema/products.schema.js';
import * as wishlists from './schema/wishlists.schema.js';
import * as orders from './schema/orders.schema.js';
import * as inventory from './schema/inventory.schema.js';
import * as reviews from './schema/reviews.schema.js';

// Combine all schemas into one object
const schema = {
  ...auth,
  ...carts,
  ...products,
  ...wishlists,
  ...orders,
  ...inventory,
  ...reviews,
  ...coupons,
};

const connectionString = process.env.DATABASE_URL!;

// Use connection pooling (default max: 10)
const sql = postgres(connectionString, { max: 10 });
export const db = drizzle(sql, { schema });