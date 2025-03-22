import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all cart items for a user
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { cartData: true },
    });

    if (!cart) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(cart.cartData);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add an item to the cart
export const addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, size, quantity } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cart = user.cartData || [];
    const existingItem = cart.find(item => item.productId === productId && item.size === size);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, size, quantity });
    }

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { cartData: cart },
    });

    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  const { userId } = req.params;
  const { productId, size, quantity } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cart = user.cartData || [];
    const itemIndex = cart.findIndex(item => item.productId === productId && item.size === size);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart[itemIndex].quantity = quantity;

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { cartData: cart },
    });

    res.json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove an item from the cart
export const removeCartItem = async (req, res) => {
  const { userId } = req.params;
  const { productId, size } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cart = user.cartData || [];
    cart = cart.filter(item => item.productId !== productId || item.size !== size);

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { cartData: cart },
    });

    res.json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Clear the cart
export const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { cartData: [] },
    });

    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
