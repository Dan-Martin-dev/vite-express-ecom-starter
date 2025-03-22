import express from "express";
import { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeCartItem, 
  clearCart 
} from "../controllers/cartController.js";

const cartRouter = express.Router();

// Get user's cart
cartRouter.get("/:userId", getCart);

// Add item to cart
cartRouter.post("/:userId", addToCart);

// Update cart item
cartRouter.put("/:userId", updateCartItem);

// Remove item from cart
cartRouter.delete("/:userId", removeCartItem);

// Clear entire cart
cartRouter.delete("/:userId/clear", clearCart);

export default cartRouter;
