import express from "express";
import {
  addProduct,
  singleProduct,
  getAllProducts,
  deleteProduct,
} from "../controller/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

const uploadFields = [
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
];
productRouter.post("/add", upload.fields(uploadFields), addProduct);

/* 
productRouter.post("/add",   (req, res) => {
  console.log("Route hit!");
  res.status(200).send("Route is working!");
});  
*/

productRouter.post("/single", singleProduct);
productRouter.get("/getall", getAllProducts);
productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;
