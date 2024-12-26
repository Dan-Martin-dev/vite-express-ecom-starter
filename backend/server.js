import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from './config/db.js'; 

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.get("/", (req, res) => {
  res.send("API Working");
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Database connection error:", err.stack);
    return;
  }
  console.log("Connected to PostgreSQL database");
  release();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
