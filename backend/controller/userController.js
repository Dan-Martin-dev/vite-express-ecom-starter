import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import validator from 'validator';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";


const validateInputs = (name, email, password) => {
  if (name.trim().length < 2 || name.trim().length > 50) {
    return "Name must be between 2 and 50 characters.";
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return "Name must only contain letters and spaces.";
  }
  if (!validator.isEmail(email)) {
    return "Invalid email format.";
  }
  if (password.length < 6 || !/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
    return "Password must be at least 6 characters long and include both letters and numbers.";
  }
  return null;
};

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const validationError = validateInputs(name, email, password);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // Check if the name already exists
    const existingName = await prisma.user.findUnique({ where: { name } });
    if (existingName) {
      return res.status(400).json({ message: "User with this name already exists" });
    }

    // Check if the email already exists
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  
    return res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token,
    });
  
  } 
  catch (error) {
    console.error("Error registering user:", error);  // Log the actual error for debugging
    res.status(500).json({
      message: "Error registering user",
      error: error.message || "Unknown error occurred",
    });
  }
}

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// User logout
export const logoutUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token is required for logout" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the token to the blacklist with its expiration time
    await prisma.tokenBlacklist.create({
      data: {
        token,
        expiresAt: new Date(decoded.exp * 1000), // JWT `exp` is in seconds, convert to milliseconds
      },
    });

    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
};

// Admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await prisma.user.findUnique({ where: { email } });
    if (!admin || !admin.isAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: admin.id, isAdmin: true }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Admin login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, cartData: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { userId } = req.user;
  const { name, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
      select: { id: true, name: true, email: true },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// Add product to cart
export const addToCart = async (req, res) => {
  const { userId } = req.user;
  const { productId, quantity } = req.body;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const cart = user.cartData || [];

    const existingCartItem = cart.find((item) => item.productId === productId);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { cartData: cart },
    });

    res.json({ message: "Product added to cart", cart: updatedUser.cartData });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  const { userId } = req.user;
  const { productId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const cart = user.cartData || [];

    const updatedCart = cart.filter((item) => item.productId !== productId);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { cartData: updatedCart },
    });

    res.json({
      message: "Product removed from cart",
      cart: updatedUser.cartData,
    });
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error });
  }
};

// Place an order
export const placeOrder = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user.cartData || user.cartData.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        items: user.cartData,
        total: user.cartData.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        ),
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { cartData: [] }, // Clear cart
    });

    res.json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

// Get order history
export const getOrderHistory = async (req, res) => {
  const { userId } = req.user;

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order history", error });
  }
};
