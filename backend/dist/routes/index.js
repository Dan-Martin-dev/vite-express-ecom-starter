// src/routes/index.ts
import { Router } from 'express';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
const router = Router();
// Users routes
router.get('/users', async (req, res, next) => {
    try {
        const allUsers = await db.select().from(users);
        res.json(allUsers);
    }
    catch (error) {
        next(error);
    }
});
router.get('/users/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await db.select().from(users).where(eq(users.id, id));
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user[0]);
    }
    catch (error) {
        next(error);
    }
});
router.post('/users', async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const newUser = await db.insert(users).values({ name, email }).returning();
        res.status(201).json(newUser[0]);
    }
    catch (error) {
        next(error);
    }
});
export default router;
