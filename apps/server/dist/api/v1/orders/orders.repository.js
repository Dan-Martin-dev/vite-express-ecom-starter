// apps/server/src/api/v1/orders/orders.repository.ts
import { eq, desc, asc, and, sql } from 'drizzle-orm';
import { orders as ordersSchema, orderItems as orderItemsSchema } from '@/db/schema/orders.schema.js';
import { db } from '@/db/index.js';
export class OrderRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    /**
     * Creates a new order record in the database.
     * @param data The order data.
     * @param tx Optional transaction client.
     * @returns The newly created order.
     */
    async createOrder(data, tx) {
        const dbClient = tx || this.db;
        const result = await dbClient.insert(ordersSchema).values(data).returning();
        return result[0];
    }
    /**
     * Creates multiple order item records in the database.
     * @param itemsData Array of order item data.
     * @param tx Optional transaction client.
     * @returns The newly created order items.
     */
    async createOrderItems(itemsData, tx) {
        if (itemsData.length === 0)
            return [];
        const dbClient = tx || this.db;
        const result = await dbClient.insert(orderItemsSchema).values(itemsData).returning();
        return result;
    }
    /**
     * Finds a single order by its ID, including its items.
     * @param orderId The ID of the order to find.
     * @returns The order with items, or undefined if not found.
     */
    async findOrderById(orderId) {
        const result = await this.db.query.orders.findFirst({
            where: eq(ordersSchema.id, orderId),
            with: {
                // Use the relation name defined in your orders.schema.ts
                // Assuming it's named 'orderItems'
                items: true, // <-- Change 'orderItems' to 'items': true,
            },
        });
        // We need to cast the result to OrderWithItems to satisfy the return type
        // This assumes the shape matches after fetching relations
        return result;
    }
    /**
     * Finds orders belonging to a specific user, with pagination and optional filtering/sorting.
     * @param userId The ID of the user whose orders to find.
     * @param input Pagination, filtering, and sorting parameters.
     * @returns An object containing the list of orders and the total count.
     */
    async findOrdersByUserId(userId, input) {
        const { limit = 10, offset = 0, sortBy = 'createdAt', sortOrder = 'desc', status } = input;
        // Build WHERE clause
        const whereClause = and(eq(ordersSchema.userId, userId), status
            ? eq(ordersSchema.status, status)
            : undefined);
        // Build ORDER BY clause
        const orderByColumn = sortBy === 'createdAt' ? ordersSchema.createdAt
            : sortBy === 'totalPrice' ? ordersSchema.totalPrice
                : sortBy === 'status' ? ordersSchema.status
                    : ordersSchema.createdAt; // Default
        const orderByDirection = sortOrder === 'asc' ? asc(orderByColumn) : desc(orderByColumn);
        // Fetch orders with items
        const results = await this.db.query.orders.findMany({
            where: whereClause,
            with: {
                // Use the relation name defined in your orders.schema.ts
                items: true,
            },
            limit: limit,
            offset: offset,
            orderBy: [orderByDirection],
        });
        // Count total matching orders
        const countResult = await this.db
            .select({ count: sql `count(*)` })
            .from(ordersSchema)
            .where(whereClause);
        const total = parseInt(countResult[0]?.count || '0', 10);
        // Cast results to OrderWithItems
        const orders = results;
        return { orders, total };
    }
}
// Export an instance of the repository
export const orderRepository = new OrderRepository(db);
//# sourceMappingURL=orders.repository.js.map