// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "@/routes/userRouter.js"; // Adjust path as needed

dotenv.config(); // Load environment variables

const app = express();

// Middleware setup
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON bodies

// Routes setup
app.get("/", (req, res) => {
  res.send("Welcome to the backend API");
});

// Use the userRouter for all user-related routes
app.use("/api/users", userRouter);

export default app;
