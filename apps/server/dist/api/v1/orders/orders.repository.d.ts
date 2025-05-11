import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schema } from '@/db/index.js';
import { DBOrder, NewOrder, DBOrderItem, NewOrderItem, OrderWithItems, GetUserOrdersInput } from './orders.types.js';
type DBSchema = typeof schema;
type DBClient = PostgresJsDatabase<DBSchema>;
export declare class OrderRepository {
    private db;
    constructor(db: DBClient);
    /**
     * Creates a new order record in the database.
     * @param data The order data.
     * @param tx Optional transaction client.
     * @returns The newly created order.
     */
    createOrder(data: NewOrder, tx?: DBClient): Promise<DBOrder>;
    /**
     * Creates multiple order item records in the database.
     * @param itemsData Array of order item data.
     * @param tx Optional transaction client.
     * @returns The newly created order items.
     */
    createOrderItems(itemsData: NewOrderItem[], tx?: DBClient): Promise<DBOrderItem[]>;
    /**
     * Finds a single order by its ID, including its items.
     * @param orderId The ID of the order to find.
     * @returns The order with items, or undefined if not found.
     */
    findOrderById(orderId: string): Promise<OrderWithItems | undefined>;
    /**
     * Finds orders belonging to a specific user, with pagination and optional filtering/sorting.
     * @param userId The ID of the user whose orders to find.
     * @param input Pagination, filtering, and sorting parameters.
     * @returns An object containing the list of orders and the total count.
     */
    findOrdersByUserId(userId: string, input: GetUserOrdersInput): Promise<{
        orders: OrderWithItems[];
        total: number;
    }>;
}
export declare const orderRepository: OrderRepository;
export {};
