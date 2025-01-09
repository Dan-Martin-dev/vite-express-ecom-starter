import schedule from "node-schedule";
import prisma from "../prisma/utils/prisma.js"; // Import Prisma or your database utility

// Function to delete expired tokens
const cleanExpiredTokens = async () => {
  try {
    const result = await prisma.tokenBlacklist.deleteMany({
      where: {
        expiresAt: { lt: new Date() }, // Delete tokens with an expired `expiresAt`
      },
    });
    console.log(`${result.count} expired tokens removed`);
  } catch (error) {
    console.error("Error cleaning up expired tokens:", error.message);
  }
};

// Schedule the job to run every midnightd
export const scheduleTokenCleanup = () => {
  schedule.scheduleJob("0 0 * * *", cleanExpiredTokens); // At midnight daily
  console.log("Token cleanup job scheduled to run every midnight");
};
