
import Producter from '../model/Product.js'

export const getProducts = async (req, res) =>  {
    const Product = await Producter();
    try {
      const products = await Product.findAll();
      res.status(200).json({success: true, data: products});
    } catch (error) {
      console.error("Error finding Products: ",error);
      res.status(500).json({success: false, data: null});
    }
}

export const getProduct = async (req, res) => {
    const Product = await Producter();
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