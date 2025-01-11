import express from "express";

const router = express.Router();

// Mock database (replace with your actual database)
let products = [];

// Controller Functions
export const addProduct = (req, res) => {
    const { id, name, price, description } = req.body;

    if (!id || !name || !price || !description) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const product = { id, name, price, description };
    products.push(product);

    return res.status(201).json({ message: "Product added successfully!", product });
};

export const singleProduct = (req, res) => {
    const { id } = req.params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        return res.status(404).json({ error: "Product not found!" });
    }

    return res.status(200).json({ product });
};

export const listProduct = (req, res) => {
    return res.status(200).json({ products });
};

export const removeProduct = (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ error: "Product not found!" });
    }

    products.splice(productIndex, 1);

    return res.status(200).json({ message: "Product removed successfully!" });
};

// Routes
router.post("/addProduct", addProduct);
router.get("/singleProduct/:id", singleProduct);
router.get("/listProduct", listProduct);
router.delete("/removeProduct/:id", removeProduct);

export default router;
