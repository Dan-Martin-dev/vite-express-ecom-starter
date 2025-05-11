import { Request, Response, NextFunction } from 'express';
import { OrderService } from "./orders.service.js";
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    /**
     * Handles POST /api/v1/orders - Creates a new order.
    */
    createOrderHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
    * Handles GET /api/v1/orders/:id - Retrieves a single order by ID.
    */
    getOrderByIdHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
   * Handles GET /api/v1/orders - Retrieves orders for the authenticated user.
   */
    getUserOrdersHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const orderController: OrderController;
