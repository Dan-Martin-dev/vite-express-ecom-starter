// cart.repository.ts
import { eq, sql, InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres'; // Adjust if using a different DB client
import { carts as cartsSchema } from '@/db/schema/carts.schema.js';
import { NewCart, Cart } from './cart.types.js';
import { db,schema} from '@/db/index.js'; // Assuming your Drizzle client is exported from here
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'; // <-- Use PostgresJsDatabase
    
// Define a type for potential updates, allowing partial Cart fields
type CartUpdate = Partial<NewCart>; // Use Partial utility type

// Infer the type of the schema object
type DBSchema = typeof schema;
// Define the type for your Drizzle database client, parameterized by your schema type
type DBClient = PostgresJsDatabase<DBSchema>; // <-- Use PostgresJsDatabase with your schema type

export class CartRepository {
  constructor(private db: DBClient) {} // <-- Corrected type
  
  // Find cart by ID
  async findById(cartId: string): Promise<Cart | undefined> {
    const result = await this.db
      .select()
      .from(cartsSchema)
      .where(eq(cartsSchema.id, cartId))
      .limit(1);
    return result[0];
  }

  // Find cart by User ID
  async findByUserId(userId: string): Promise<Cart | undefined> {
    // Assuming a user typically has one active cart, maybe filter by expiresAt if you implement cart expiry
    const result = await this.db
      .select()
      .from(cartsSchema)
      .where(eq(cartsSchema.userId, userId))
      // Add potential filtering for active carts if needed, e.g. && sql`${cartsSchema.expiresAt} IS NULL OR ${cartsSchema.expiresAt} > now()`
      .orderBy(cartsSchema.createdAt) // Or by updatedAt?
      .limit(1); // Assuming one main cart per user
    return result[0];
  }

  // Find cart by Session ID (for guest carts)
  async findBySessionId(sessionId: string): Promise<Cart | undefined> {
     const result = await this.db
      .select()
      .from(cartsSchema)
      .where(eq(cartsSchema.sessionId, sessionId))
       // Add potential filtering for active carts if needed, e.g. && sql`${cartsSchema.expiresAt} IS NULL OR ${cartsSchema.expiresAt} > now()`
      .orderBy(cartsSchema.createdAt) // Or by updatedAt?
      .limit(1); // Assuming one main guest cart per session
    return result[0];
  }


  // Create a new cart
  async create(data: NewCart): Promise<Cart> {
    const result = await this.db
      .insert(cartsSchema)
      .values(data)
      .returning();
    return result[0]; // insert().returning() returns an array
  }

  // Update an existing cart by ID
  async update(cartId: string, data: CartUpdate): Promise<Cart | undefined> {
    // Ensure updatedAt is updated automatically or set here
     const result = await this.db
      .update(cartsSchema)
      .set({
          ...data,
          updatedAt: new Date(), // Explicitly update timestamp
      })
      .where(eq(cartsSchema.id, cartId))
      .returning();
     return result[0];
  }

  // Delete a cart by ID
  async delete(cartId: string): Promise<void> {
    await this.db
      .delete(cartsSchema)
      .where(eq(cartsSchema.id, cartId));
  }

    // Note: Operations on the `items` JSONB array (adding, updating, removing items)
    // are complex updates to a single row and are often handled in the Service
    // layer using utility functions to manipulate the array, then calling the
    // repository's `update` method with the modified `items` array.
    // For direct DB manipulation of JSONB items, you might use specific Drizzle
    // JSONB functions if they suit your needs, but array manipulation in application
    // code is often more flexible for complex logic (like merging items, checking stock).
}

// Export an instance of the repository connected to your DB client
export const cartRepository = new CartRepository(db);