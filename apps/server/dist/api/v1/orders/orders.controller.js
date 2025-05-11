// apps/server/src/api/v1/orders/orders.controller.ts
import { orderServiceInstance } from "./orders.service.js"; // Import instance
import { GetOrderByIdInputSchema } from "./orders.validators.js";
import { AppError } from '@/types/index.js';
export class OrderController {
    orderService;
    // Inject service instance
    constructor(orderService) {
        this.orderService = orderService;
    }
    /**
     * Handles POST /api/v1/orders - Creates a new order.
    */
    async createOrderHandler(req, res, next) {
        try {
            // Ensure user is authenticated (should be handled by middleware)
            const userId = req.user?.id;
            if (!userId) {
                // This check is redundant if auth middleware is strictly enforced before this handler
                return next(new AppError("Authentication required to create an order.", 401));
            }
            // req.body is validated by middleware, cast to inferred type
            const validatedBody = req.body;
            const newOrder = await this.orderService.createOrder(userId, validatedBody);
            res.status(201).json(newOrder); // Respond with 201 Created and the new order details
        }
        catch (error) {
            next(error); // Pass errors to central error handler
        }
    }
    /**
    * Handles GET /api/v1/orders/:id - Retrieves a single order by ID.
    */
    async getOrderByIdHandler(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return next(new AppError("Authentication required.", 401));
            }
            // Extract and validate order ID from path parameter
            const orderId = GetOrderByIdInputSchema.shape.id.parse(req.params.id); // Validate param using Zod directly
            const order = await this.orderService.getOrderById(userId, orderId);
            res.status(200).json(order);
        }
        catch (error) {
            next(error);
        }
    }
    /**
   * Handles GET /api/v1/orders - Retrieves orders for the authenticated user.
   */
    async getUserOrdersHandler(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return next(new AppError("Authentication required.", 401));
            }
            // req.query is validated by middleware, cast to inferred type
            const validatedQuery = req.query;
            const { orders, total } = await this.orderService.getUserOrders(userId, validatedQuery);
            // Respond with order list and pagination metadata
            res.status(200).json({
                data: orders,
                meta: {
                    total: total,
                    limit: validatedQuery.limit,
                    offset: validatedQuery.offset,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
// Export an instance of the controller, injecting the service instance
export const orderController = new OrderController(orderServiceInstance);
//# sourceMappingURL=orders.controller.js.map