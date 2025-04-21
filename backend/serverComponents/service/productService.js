import prisma from "../config/index.js";
import errorHandler from "../utils/errorHandler.js";

export const getProductsService = async () => {
  // await generateProductInstance();
  // try {
  //   return await Product.findAll();
  // } catch (error) {
  //   logger.error(error);
  //   return null;
  // }
  return await errorHandler(prisma.product.findMany());
};

export const getProductService = async (id) => {
  // await generateProductInstance();
  // try {
  //   return await Product.findOne({
  //     where: { id },
  //   });
  // } catch (error) {
  //   logger.error(error);
  //   return null;
  // }
  return await errorHandler(
    prisma.product.findUnique({
      where: { id },
    })
  );
};

export const getProductCategoryService = async () => {
  // await generateProductInstance();
  // try {
  //     return await Product.findAll({
  //         attributes: ['category'],
  //         group: ['category'],
  //         raw: true,
  //     });
  // } catch (error) {
  //     logger.error(error);
  //     return null;
  // }
  return await errorHandler(
    prisma.product.groupBy({
      by: ["category"],
      _count: {
        category: true,
      },
    })
  );
};

export const getProductByCategoryService = async (category) => {
  // await generateProductInstance();
  // try {
  //   return await Product.findAll({
  //     where: { category },
  //   });
  // } catch (error) {
  //   logger.error(error);
  //   return null;
  // }
  return await errorHandler(
    prisma.product.findMany({
      where: { category },
    })
  );
};
