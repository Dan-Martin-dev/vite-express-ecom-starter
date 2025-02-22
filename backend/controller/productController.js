import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST endpoint to add a product
export const addProduct = async (req, res) => {
  console.log("🛠️ Request received!");
  console.log("Uploaded files:", req.files); // Check what Multer receives
  console.log("Request body:", req.body);
  
  try {
    let { name, description, price, categoryId, subcategoryId, variants } =
      req.body;

    variants = Array.isArray(variants)
      ? variants
      : JSON.parse(variants || "[]");

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
      return res
        .status(400)
        .json({ message: "At least one product image is required." });
    }

    // Validation
    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({ message: "Required fields are missing." });
    }
    if (!variants || !Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({
        message:
          "Variants are required and should be an array with size and stock values.",
      });
    }
    if (invalidVariants) {
      return res
        .status(400)
        .json({ message: "Each variant must have size and stock." });
    }

    // Validate category existence
    const categoryExists = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found." });
    }
    if (imagePaths.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one product image is required." });
    }
    if (!variants || !Array.isArray(variants)) {
      return res
        .status(400)
        .json({ message: "Variants must be a valid array." });
    }

    // Prepare sizes and stock

    // Create the product
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        subcategoryId: parseInt(subcategoryId),
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
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
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

export const getAllProducts = async (req, res) => {
  try {
    // Query the database for all products, including images and variants
    const products = await prisma.product.findMany({
      include: {
        images: true,
        variants: true,
      },
    });

    // Function to format price
    const formatCurrency = (value) => {
      return value.toLocaleString("es-AR", { minimumFractionDigits: 2 });
    };

    // Format each product with installment details
    const formattedProducts = products.map((product) => {
      const installments = product.installments || 6; // Default to 6 installments
      const installmentPrice = (product.price / installments).toFixed(2);

      return {
        ...product,
        formattedPrice: `$${formatCurrency(product.price)}`,
        share: `${installments} x $${formatCurrency(Number(installmentPrice))} sin interés`,
      };
    });

    // Respond with the product data
    res.status(200).json({
      message: "Products retrieved successfully",
      products: formattedProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { images: true, variants: true },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    } 

    // Delete associated images and variants
    await prisma.image.deleteMany({ where: { productId: product.id } });
    await prisma.productVariant.deleteMany({ where: { productId: product.id } });

    // Delete the product itself
    await prisma.product.delete({ where: { id: product.id } });

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

