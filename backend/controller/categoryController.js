import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { products: true }, // Include products in this category
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Create a new category
export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const existingCategory = await prisma.category.findUnique({ where: { name } });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists." });
    }

    const newCategory = await prisma.category.create({
      data: { name, description },
    });

    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name, description },
    });

    res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
