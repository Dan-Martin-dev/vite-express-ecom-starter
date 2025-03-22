import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all product variants
export const getAllProductVariants = async (req, res) => {
  try {
    const variants = await prisma.productVariant.findMany({
      include: { product: true }, // Include product details if needed
    });
    res.json(variants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product variants" });
  }
};

// Get a single product variant by ID
export const getProductVariantById = async (req, res) => {
  const { id } = req.params;
  try {
    const variant = await prisma.productVariant.findUnique({
      where: { id: parseInt(id) },
      include: { product: true },
    });

    if (!variant) {
      return res.status(404).json({ error: "Product variant not found" });
    }

    res.json(variant);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product variant" });
  }
};

// Create a new product variant
export const createProductVariant = async (req, res) => {
  const { size, stock, productId } = req.body;
  try {
    const variant = await prisma.productVariant.create({
      data: {
        size,
        stock,
        productId: parseInt(productId),
      },
    });
    res.status(201).json(variant);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product variant" });
  }
};

// Update a product variant
export const updateProductVariant = async (req, res) => {
  const { id } = req.params;
  const { size, stock } = req.body;
  try {
    const variant = await prisma.productVariant.update({
      where: { id: parseInt(id) },
      data: { size, stock },
    });

    res.json(variant);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product variant" });
  }
};

// Delete a product variant
export const deleteProductVariant = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.productVariant.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Product variant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product variant" });
  }
};
