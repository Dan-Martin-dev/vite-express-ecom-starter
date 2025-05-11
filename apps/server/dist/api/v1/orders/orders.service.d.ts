import { OrderRepository } from "./orders.repository.js";
import { OrderWithItems } from "./orders.types.js";
import { CartService } from '@/api/v1/cart/cart.service.js';
import { ProductService } from '@/api/v1/products/products.service.js';
import { z } from 'zod';
import { CreateOrderInputSchema, GetUserOrdersInputSchema } from "./orders.validators.js";
export declare class OrderService {
    private orderRepository;
    private cartService;
    private productService;
    constructor(orderRepository: OrderRepository, cartService: CartService, productService: ProductService);
    /**
     * Creates a new order based on the user's cart and input data.
     * Handles transaction, stock update, and cart clearing.
     * @param userId The ID of the user placing the order.
     * @param input Validated input data (address, payment method).
     * @returns The newly created order with its items.
     */
    createOrder(userId: string, input: z.infer<typeof CreateOrderInputSchema>): Promise<OrderWithItems>;
    /**
     * Retrieves a single order by its ID for a specific user.
     * @param userId The ID of the user requesting the order.
     * @param orderId The ID of the order to retrieve.
     * @returns The order with its items.
     * @throws NotFoundError if the order is not found or doesn't belong to the user.
     */
    getOrderById(userId: string, orderId: string): Promise<OrderWithItems>;
    /**
     * Retrieves a list of orders for a specific user.
     * @param userId The ID of the user whose orders to retrieve.
     * @param input Pagination, filtering, and sorting parameters (validated).
     * @returns An object containing the list of orders and the total count.
     */
    getUserOrders(userId: string, input: z.infer<typeof GetUserOrdersInputSchema>): Promise<{
        orders: OrderWithItems[];
        total: number;
    }>;
}
declare const orderServiceInstance: OrderService;
export { orderServiceInstance };
