// apps/server/src/api/v1/orders/orders.routes.ts
import { Router } from 'express';
import { orderController } from "./orders.controller.js";
import { validateRequestBody, validateQueryParams } from '../../../middleware/validation.middleware.js';
import { isAuthenticated } from '../../../middleware/auth.middleware.js'; // Your auth middleware
import { CreateOrderInputSchema, GetUserOrdersInputSchema,
// GetOrderByIdInputSchema // ID is validated in controller for params
 } from "./orders.validators.js";
const router = Router();
// ALL order routes require authentication
router.use(isAuthenticated);
// POST /api/v1/orders - Create a new order
router.post('/', validateRequestBody(CreateOrderInputSchema), orderController.createOrderHandler);
// GET /api/v1/orders - Get orders for the authenticated user
router.get('/', validateQueryParams(GetUserOrdersInputSchema), orderController.getUserOrdersHandler);
// GET /api/v1/orders/:id - Get a specific order by ID
router.get('/:id', 
// Param validation happens in controller using GetOrderByIdInputSchema.shape.id.parse()
orderController.getOrderByIdHandler);
// TODO: Add routes for admin (e.g., update status) with appropriate admin auth middleware
// router.put('/:id/status', authenticateAdmin, validateRequestBody(UpdateOrderStatusSchema), orderController.updateOrderStatusHandler);
export default router;
//# sourceMappingURL=orders.routes.js.map