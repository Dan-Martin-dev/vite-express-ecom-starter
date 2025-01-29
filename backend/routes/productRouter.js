import express from "express";
import {
  addProduct,
  singleProduct,
  listProduct,
  removeProduct,
} from "../controller/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

const uploadFields = [
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
];

/* productRouter.post("/add",   (req, res) => {
  console.log("Route hit!");
  res.status(200).send("Route is working!");
});  */

productRouter.post("/add", upload.fields(uploadFields), addProduct);
productRouter.post("/single", singleProduct);
productRouter.post("/list", listProduct);
productRouter.post("/remove", removeProduct);

export default productRouter;
