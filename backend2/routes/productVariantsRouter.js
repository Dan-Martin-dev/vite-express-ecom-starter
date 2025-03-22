import express from "express";
import {
  getAllProductVariants,
  getProductVariantById,
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
} from "../controller/productVariantsController.js"; // ✅ Use `.js`

const productVariantsRouter = express.Router();

productVariantsRouter.get("/", getAllProductVariants);
productVariantsRouter.get("/:id", getProductVariantById);
productVariantsRouter.post("/", createProductVariant);
productVariantsRouter.put("/:id", updateProductVariant);
productVariantsRouter.delete("/:id", deleteProductVariant);

export default productVariantsRouter;
