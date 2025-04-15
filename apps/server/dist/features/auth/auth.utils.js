// src/api/v1/routes/auth.routes.ts
import { db } from '../../db/index.js';
import * as schema from '../../db/schema/auth.schema.js';
import { eq } from 'drizzle-orm';
export async function getUserAddresses(userId) {
    const user = await db.select({ addresses: schema.users.addresses })
        .from(schema.users)
        .where(eq(schema.users.id, userId))
        .limit(1);
    return user[0]?.addresses || [];
}
//# sourceMappingURL=auth.utils.js.map