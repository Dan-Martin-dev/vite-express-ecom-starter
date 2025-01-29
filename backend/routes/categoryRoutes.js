import express from "express";
import { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeCartItem, 
  clearCart 
} from "../controller/cartController.js";

const categoryRouter = express.Router();

// Get user's cart
categoryRouter.get("/:userId", getCart);

// Add item to cart
categoryRouter.post("/:userId", addToCart);

// Update cart item
categoryRouter.put("/:userId", updateCartItem);

// Remove item from cart
categoryRouter.delete("/:userId", removeCartItem);

// Clear entire cart
categoryRouter.delete("/:userId/clear", clearCart);

export default router;
