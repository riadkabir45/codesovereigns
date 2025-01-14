import express from "express"
import { getProducts } from '../controller/laptopController.js';

const router = express.Router();

router.get("/",getProducts);

export default router;