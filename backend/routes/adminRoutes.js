import express from 'express';
import { adminLogin } from './adminController.js';
import { verifyAdmin } from './middlewares.js';

const adminRouter = express.Router();

// Admin login route
adminRouter.post('/login', adminLogin);

// Protected admin route example
adminRouter.get('/dashboard', verifyAdmin, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

// Another protected route example
adminRouter.get('/manage-users', verifyAdmin, async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json({ users });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
});

export default router;
