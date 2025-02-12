// server.js
import app from "./app.js";
import { scheduleTokenCleanup } from "/home/vare/project/microservices_1/ecommerce_1/vite-express-ecom-starter/backend/jobs/cleanupTokens.js";
import express from 'express';
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';




// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 4000;

// Allow CORS and JSON parsing
app.use(express.json());
app.use(cors());

// Serve static files from "uploads" folder
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

// Schedule the cleanup job
scheduleTokenCleanup();
