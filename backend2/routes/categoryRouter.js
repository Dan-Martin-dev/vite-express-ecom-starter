import express from "express";
import { 
  getCategories, 
  getCategoryById, 
  addCategory, 
  updateCategory, 
  deleteCategory 
} from "../controller/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/get", getCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/add", addCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
