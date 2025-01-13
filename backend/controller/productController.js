import express from "express";

const router = express.Router();

// Mock database (replace with your actual database)
let products = [];

// Controller Functions
export const addProduct = async (req, res) => {

  try {
    // Destructure required fields from req.body
    const {
      id,
      name,
      price,
      description,
      collection,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Validate required fields
    if (!id || !name || !price || !description) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (!req.files || !req.files.image1 || !req.files.image2) {
      return res.status(400).json({ error: "At least two images (image1 and image2) are required!" });
    }

    // Extract uploaded images
    const image1 = req.files.image1[0]?.path;
    const image2 = req.files.image2[0]?.path;

    // Extract optional images (if provided)
    const image3 = req.files.image3 ? req.files.image3[0]?.path : null;
    const image4 = req.files.image4 ? req.files.image4[0]?.path : null;

    // Log received data for debugging
    console.log({
      id,
      name,
      price,
      description,
      collection,
      category,
      subCategory,
      sizes,
      bestseller,
    });
    console.log({ image1, image2, image3, image4 });

    // Validate file uploads
    const products = {
      name,
      price,
      description,
      collection,
      category,
      subCategory,
      sizes,
      bestseller,
      images: [image1, image2, image3, image4],
    };

    // cgl
    console.log(
      name,
      price,
      description,
      collection,
      category,
      subCategory,
      sizes,
      bestseller
    );
    console.log(image1, image2, image3, image4);

    // Response
    return res
      .status(201)
      .json({ message: "Product added successfully!", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
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
