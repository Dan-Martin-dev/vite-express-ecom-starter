import express from "express";
import {
  addProduct,
  singleProduct,
  listProduct,
  removeProduct,
} from "../controller/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/single", singleProduct);
productRouter.post("/list", listProduct);
productRouter.post("/remove", removeProduct);

export default productRouter;
