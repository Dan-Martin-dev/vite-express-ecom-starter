// src/api/v1/index.ts
import { Router } from 'express';
import cartRoutes from './cart/cart.routes.js';
import authRoutes from './auth/auth.routes.js';
import productRoutes from './products/products.routes.js';
import orderRoutes from './orders/orders.routes.js'; // <-- Import order routes
const v1Router = Router();
// Register V1 routes
v1Router.use('/cart', cartRoutes);
v1Router.use('/products', productRoutes);
v1Router.use('/auth', authRoutes);
v1Router.use('/orders', orderRoutes); // <-- Register order routes
export default v1Router;
//# sourceMappingURL=index.js.map