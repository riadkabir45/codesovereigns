import express from "express"
import { getProduct, getProductByCategory, getProducts } from '../controller/productController.js';

const router = express.Router();

router.get("/",getProducts);
router.get("/:id",getProduct);
router.get("/category/:category",getProductByCategory);

export default router;