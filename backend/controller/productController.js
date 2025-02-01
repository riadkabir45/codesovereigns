
import Product from '../model/Product.js'

export const getProducts = async (req, res) =>  {
    try {
      const products = await Product.findAll();
      res.status(200).json({success: true, data: products});
    } catch (error) {
      console.error("Error finding Products: ",error);
      res.status(500).json({success: false, data: null});
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({
            where: { id }
        });
        res.status(200).json({success: true, data: product});
      } catch (error) {
        console.error("Error finding Product: ",error);
        res.status(500).json({success: false, data: null});
      }
}