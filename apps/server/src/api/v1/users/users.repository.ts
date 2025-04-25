import { db } from '@/db/index.js';
import * as schema from '@/db/schema/auth.schema.js'; // Adjust path if needed
import { eq } from 'drizzle-orm';
import { ShippingAddress } from '@/types/index.js'; // Adjust path

export class UserRepository {
    async findUserById(userId: string) {
        const result = await db.select()
            .from(schema.users)
            .where(eq(schema.users.id, userId))
            .limit(1);
        return result[0] || null;
    }

    async updateUserProfile(userId: string, data: Partial<typeof schema.users.$inferInsert>) {
        const result = await db.update(schema.users)
            .set({ ...data, updatedAt: new Date() }) // Always update timestamp
            .where(eq(schema.users.id, userId))
            .returning(); // Return the updated record
        return result[0] || null;
    }

    async getUserAddresses(userId: string): Promise<ShippingAddress[]> {
        const user = await db.select({ addresses: schema.users.addresses })
            .from(schema.users)
            .where(eq(schema.users.id, userId))
            .limit(1);
        // Ensure parsing if addresses could be null/undefined in DB
        return user[0]?.addresses ?? [];
    }

    async updateUserAddresses(userId: string, addresses: ShippingAddress[]): Promise<void> {
        await db.update(schema.users)
            .set({ addresses: addresses, updatedAt: new Date() })
            .where(eq(schema.users.id, userId));
    }

    // ... other methods
}

export const userRepository = new UserRepository();