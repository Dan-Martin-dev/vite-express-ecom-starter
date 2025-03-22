// controllers/subcategoryController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all subcategories
export const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await prisma.subcategory.findMany();
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching subcategories', details: error.message });
    }
};

// Get a single subcategory by ID
export const getSubcategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const subcategory = await prisma.subcategory.findUnique({ where: { id: parseInt(id) } });

        if (!subcategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }

        res.json(subcategory);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching subcategory', details: error.message });
    }
};

// Create a new subcategory
export const createSubcategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body;

        if (!name || !categoryId) {
            return res.status(400).json({ error: 'Name and categoryId are required' });
        }

        const subcategory = await prisma.subcategory.create({
            data: {
                name,
                categoryId: parseInt(categoryId),
            },
        });

        res.status(201).json(subcategory);
    } catch (error) {
        res.status(500).json({ error: 'Error creating subcategory', details: error.message });
    }
};

// Update an existing subcategory
export const updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, categoryId } = req.body;

        const subcategory = await prisma.subcategory.update({
            where: { id: parseInt(id) },
            data: { name, categoryId: parseInt(categoryId) },
        });

        res.json(subcategory);
    } catch (error) {
        res.status(500).json({ error: 'Error updating subcategory', details: error.message });
    }
};

// Delete a subcategory
export const deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.subcategory.delete({ where: { id: parseInt(id) } });

        res.json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting subcategory', details: error.message });
    }
};

