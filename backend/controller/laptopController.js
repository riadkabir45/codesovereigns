
import Laptop from '../models/Laptop.js'

export const getProducts = async (req, res) =>  {
    try {
      const laptops = await Laptop.findAll();
      res.status(200).json({success: true, data: laptops});
    } catch (error) {
      console.error("Error finding laptops: ",error);
      res.status(500).json({success: false, data: null});
    }
}