// server.js
import app from "./app.js";
import { scheduleTokenCleanup } from "/home/vare/project/microservices_1/ecommerce_1/vite-express-ecom-starter/backend/jobs/cleanupTokens.js";
import express from 'express';

// Start the server
const port = process.env.PORT || 4000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Schedule the cleanup job
scheduleTokenCleanup();
