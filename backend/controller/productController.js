import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST endpoint to add a product
export const addProduct = async (req, res) => {
  console.log("🛠️ Request received!");
  console.log("Uploaded files:", req.files); // Check what Multer receives
  console.log("Request body:", req.body);
  try {
    let { name, description, price, categoryId, subcategoryId, variants } = req.body;

    variants = Array.isArray(variants) ? variants : JSON.parse(variants || "[]");

    const invalidVariants = variants.some(
      (variant) => !variant.size || variant.stock == null
    );

    const imagePaths = req.files
    ? [
        req.files.image1?.[0]?.path,
        req.files.image2?.[0]?.path,
        req.files.image3?.[0]?.path,
        req.files.image4?.[0]?.path,
      ].filter(Boolean)
    : [];
    if (imagePaths.length === 0) {
      return res.status(400).json({ message: "At least one product image is required." });
    }

    // Validation
    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({ message: "Required fields are missing." });
    }
    if (!variants || !Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({
        message: "Variants are required and should be an array with size and stock values.",
      });
    }
    if (invalidVariants) {
      return res.status(400).json({ message: "Each variant must have size and stock." });
    } 

    // Validate category existence
    const categoryExists = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found." });
    }
    if (imagePaths.length === 0) {
      return res.status(400).json({ message: "At least one product image is required." });
    }
    if (!variants || !Array.isArray(variants)) {
      return res.status(400).json({ message: "Variants must be a valid array." });
    }

    // Prepare sizes and stock
    const totalStock = (variants || []).reduce((acc, variant) => acc + (variant.stock || 0), 0);
    const sizes = [...new Set(variants.map((variant) => variant.size))];




    // Create the product
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),     
        stock: totalStock,
        sizes,
        categoryId: parseInt(categoryId),
        subcategoryId: subcategoryExists ? parseInt(subcategoryId) : null,
        images: {
          create: imagePaths.map((url) => ({ url })),
        },
        variants: {
          create: variants.map((variant) => ({
            size: variant.size,
            stock: parseInt(variant.stock),
          })),
        },
      },
      include: {
        images: true,
        variants: true,
      },
    });

    console.log("Extracted image paths:", imagePaths);

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
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
