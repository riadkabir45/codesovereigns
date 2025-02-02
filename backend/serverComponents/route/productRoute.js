import express from "express"
import { getProduct, getProductByCategory, getProducts, getProductCategory } from '../controller/productController.js';

const router = express.Router();

router.get("/category",getProductCategory);
router.get("/category/:category",getProductByCategory);
router.get("/",getProducts);
router.get("/:id",getProduct);

export default router;