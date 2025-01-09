// Import required dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';  // If using Prisma for database
import pool from '/home/vare/project/microservices_1/ecommerce_1/vite-express-ecom-starter/backend/config/db.js';  
import userRouter from '/home/vare/project/microservices_1/ecommerce_1/vite-express-ecom-starter/backend/routes/userRouter.js';

// Initialize environment variables
dotenv.config();

// Initialize Express app and Prisma client (if using Prisma)
const app = express();
const prisma = new PrismaClient();

// Middleware setup
app.use(cors({
    origin: ['http://localhost:5173',],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
}));
app.options('*', cors());
app.use(express.json()); // Parse JSON bodies

// Routes setup
app.get('/', (req, res) => {
  res.send('Welcome to the backend API');
});

// Use the userRouter for all user-related routes
app.use('/api/users', userRouter);

// Start the server
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


