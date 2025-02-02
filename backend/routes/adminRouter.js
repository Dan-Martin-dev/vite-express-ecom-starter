import express from 'express';
import { adminLogin, adminRegister } from '../controller/adminController.js';
import { validateAdminLogin, handleValidationErrors } from '../middleware/middleware.js';

const adminRouter = express.Router();

// Admin login route
adminRouter.post('/login', validateAdminLogin, handleValidationErrors, adminLogin);

adminRouter.post('/register', adminRegister);

export default adminRouter;
