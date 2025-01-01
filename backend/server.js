// Import required dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';  // If using Prisma for database

// Initialize environment variables
dotenv.config();

// Initialize Express app and Prisma client (if using Prisma)
const app = express();
const prisma = new PrismaClient();

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Routes setup
app.get('/', (req, res) => {
  res.send('Welcome to the backend API');
});

// Example of a register route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation (could be more complex or use a library)
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Save user to the database (this is just an example)
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Example of a simple error-handling middleware
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Generic error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
