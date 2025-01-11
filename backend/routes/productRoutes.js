import express from 'express'
import { addProduct, singleProduct, listProduct, removeProduct } from '../controller/productController.js'

const productRouter = express.Router();

productRouter.post('/add', addProduct)
productRouter.post('/single', singleProduct)
productRouter.post('/list', listProduct)
productRouter.post('/remove', removeProduct)

export default productRouter;