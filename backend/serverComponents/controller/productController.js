import { getProductByCategoryService, getProductService, getProductsService } from '../service/productService.js';

export const getProducts = async (req, res) =>  {
    try {
      const products = await getProductsService();
      res.status(200).json({success: true, data: products});
    } catch (error) {
      console.error("Error finding Products: ",error);
      res.status(500).json({success: false, data: null});
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductService(id);
        res.status(200).json({success: true, data: product});
      } catch (error) {
        console.error("Error finding Product: ",error);
        res.status(500).json({success: false, data: null});
      }
}

export const getProductByCategory = async (req, res) => {
  try {
      const { category } = req.params;
      const product = await getProductByCategoryService(category);
      res.status(200).json({success: true, data: product});
    } catch (error) {
      console.error("Error finding Product: ",error);
      res.status(500).json({success: false, data: null});
    }
}