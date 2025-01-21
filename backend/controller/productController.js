import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Controller Functions
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData); // Parse the JSON string
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
    } = productData;

    // Validate required fields
    if (!id || !name || !price || !description) {
      return res.status(400).json({ error: "All fields are requireddd!" });
    }

    if (!req.files || !req.files.image1 || !req.files.image2) {
      return res.status(400).json({
        error: "At least two images (image1 and image2) are required!",
      });
    }

    // Extract uploaded images
    const image1 = req.files.image1[0]?.path;
    const image2 = req.files.image2[0]?.path;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded!" });
    }
    
    if (!req.files.image1 || !req.files.image2) {
      return res.status(400).json({ error: "At least two images (image1 and image2) are required!" });
    }
    if (!image1 || !image2) {
      return res.status(400).json({
        error: "At least two images (image1 and image2) are required!",
      });
    }

    // Extract optional images (if provided)
    const image3 = req.files.image3 ? req.files.image3[0]?.path : null;
    const image4 = req.files.image4 ? req.files.image4[0]?.path : null;

    // Check if the category exists
    const categoryRecord = await prisma.category.findUnique({
      where: { name: category },
    });

    if (!categoryRecord) {
      return res.status(404).json({ error: "Category not found!" });
    }

    // Check if the subcategory exists (if provided)
    let subCategoryId = null;
    if (subCategory) {
      const subCategoryRecord = await prisma.subcategory.findUnique({
        where: { name: subCategory },
      });

      if (!subCategoryRecord) {
        return res.status(404).json({ error: "Subcategory not found!" });
      }

      subCategoryId = subCategoryRecord.id;
    }

    // Create the product record
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        stock: 0, // Set default stock; adjust logic if stock is part of req.body
        imageUrl: image1, // Use the first image as primary; adjust as needed
        sizes: parsedSizes,
        categoryId: categoryRecord.id,
        subcategoryId: subCategoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    // Store additional images (optional logic for storing image references)
    const additionalImages = [image2, image3, image4].filter((img) => img);
    if (additionalImages.length > 0) {
      await prisma.image.createMany({
        data: additionalImages.map((img) => ({
          url: img,
          productId: product.id,
        })),
      });
    }
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    console.log("Category:", categoryRecord);
    console.log("Subcategory:", subCategoryRecord);
    console.log(req.files)
    // Response
    return res.status(201).json({
      message: "Product added successfully!",
      product,
    });
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
