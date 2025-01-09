// server.js
import app from "./app.js";
import { scheduleTokenCleanup } from "@/jobs/cleanupTokens.js";

// Start the server
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Schedule the cleanup job
scheduleTokenCleanup();
