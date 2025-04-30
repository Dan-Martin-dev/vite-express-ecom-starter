// src/routes/index.ts
import { Router } from 'express';
import cartRoutes from './cart/cart.routes.js';
import authService from './auth/auth.routes.js';
import productRoutes from './products/products.routes.js';
const v1Router = Router();
// Register V1 routes
v1Router.use('/cart', cartRoutes);
v1Router.use('/products', productRoutes);
v1Router.use('/auth', authService);
export default v1Router;
//# sourceMappingURL=index.js.map