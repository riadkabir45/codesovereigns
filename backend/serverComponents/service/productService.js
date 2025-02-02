import logger from '../config/logger.js';
import Producter from '../model/Product.js'

let Product;

async function generateProductInstance(){
    if(!Product){
        Product = await Producter();
    }
}


export const getProductsService = async () =>  {
    await generateProductInstance();
    try {
        return await Product.findAll();
    } catch (error) {
        logger.error(error);
        return null;
    }
}

export const getProductService = async (id) => {
    await generateProductInstance();
    try {
        return await Product.findOne({
            where: { id }
        });
    } catch (error) {
        logger.error(error);
        return null;
    }
}


export const getProductByCategoryService = async (category) => {
    await generateProductInstance();
    try {
        return await Product.findAll({
            where: { category }
        });
    } catch (error) {
        logger.error(error);
        return null;
    }
}