import express from "express";
import { adminLogin, adminRegister } from "../controller/adminController.js";
import {
  verifyAdmin,
  authenticateToken,
  handleValidationErrors,
  validateAdminLogin,
} from "../middleware/middleware.js";

const adminRouter = express.Router();

// Admin login route
adminRouter.post(
  "/login",
  validateAdminLogin,
  handleValidationErrors,
  adminLogin
);
adminRouter.post("/register", adminRegister);
adminRouter.get("/dashboard", authenticateToken, verifyAdmin, (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the admin dashboard", user: req.user });
});
export default adminRouter;
