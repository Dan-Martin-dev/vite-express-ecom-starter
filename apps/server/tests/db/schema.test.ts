import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../../src/db/schema';

// Use a separate test database
const TEST_DB_URL = process.env.TEST_DATABASE_URL!;

describe('Drizzle Schema', () => {
  let db: ReturnType<typeof drizzle>;
  let sql: ReturnType<typeof postgres>;

  beforeAll(async () => {
    sql = postgres(TEST_DB_URL);
    db = drizzle(sql, { schema });
    
    // Optional: Run migrations before tests
    // await migrate(db, { migrationsFolder: 'src/db/migrations' });
  });

  afterAll(async () => {
    await sql.end();
  });

  describe('Users Table', () => {
    it('should allow creating a user', async () => {
      const newUser = await db.insert(schema.users).values({
        name: 'Test User',
        email: 'test@example.com',
      }).returning();
      
      expect(newUser[0]).toHaveProperty('id');
      expect(newUser[0].email).toBe('test@example.com');
    });

    it('should enforce unique email constraint', async () => {
      // First insert should work
      await db.insert(schema.users).values({
        name: 'Duplicate',
        email: 'duplicate@example.com',
      });

      // Second insert with same email should fail
      await expect(
        db.insert(schema.users).values({
          name: 'Duplicate',
          email: 'duplicate@example.com',
        })
      ).rejects.toThrow();
    });
  });
});