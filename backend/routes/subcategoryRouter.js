import express from "express";
import
   { getAllSubcategories,
    getSubcategoryById,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory}
from '../controller/subcategoryController.js'

const subcategoryRouter = express.Router();

subcategoryRouter.get('/', getAllSubcategories);
subcategoryRouter.get('/:id', getSubcategoryById);
subcategoryRouter.post('/', createSubcategory);
subcategoryRouter.put('/:id', updateSubcategory);
subcategoryRouter.delete('/:id', deleteSubcategory);

export default subcategoryRouter