
import Laptop from '../model/Laptop.js'

export const getProducts = async (req, res) =>  {
    try {
      const laptops = await Laptop.findAll();
      res.status(200).json({success: true, data: laptops});
    } catch (error) {
      console.error("Error finding laptops: ",error);
      res.status(500).json({success: false, data: null});
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const laptop = await Laptop.findOne({
            where: { id }
        });
        res.status(200).json({success: true, data: laptop});
      } catch (error) {
        console.error("Error finding laptop: ",error);
        res.status(500).json({success: false, data: null});
      }
}