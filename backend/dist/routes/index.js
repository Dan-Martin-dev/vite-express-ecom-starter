// src/routes/index.ts
import { Router } from 'express';
import { db } from '../db';
import { users, posts } from '../db/schema';
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
        const user = await db.select().from(users).where(eq(users.id, parseInt(id)));
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
// Posts routes
router.get('/posts', async (req, res, next) => {
    try {
        const allPosts = await db.select().from(posts);
        res.json(allPosts);
    }
    catch (error) {
        next(error);
    }
});
router.get('/posts/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const post = await db.select().from(posts).where(eq(posts.id, parseInt(id)));
        if (post.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post[0]);
    }
    catch (error) {
        next(error);
    }
});
router.post('/posts', async (req, res, next) => {
    const { title, content, userId } = req.body;
    try {
        const newPost = await db.insert(posts).values({ title, content, userId }).returning();
        res.status(201).json(newPost[0]);
    }
    catch (error) {
        next(error);
    }
});
export default router;
