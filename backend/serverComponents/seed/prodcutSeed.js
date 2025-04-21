import fs from "fs";
import { join } from "path";
import root from "../function/root.js";
import { readdir, stat } from "fs/promises";
import formatFileName from "../function/formatName.js";
import prisma from "../config/index.js";

const range = 10;

async function seedProducts() {
  const dataFolder = join(root, "sample", "products");

  try {
    const files = await readdir(dataFolder);
    for (const file of files) {
      const fullPath = join(dataFolder, file);
      const fileStat = await stat(fullPath);
      if (fileStat.isFile()) {
        try {
          const data = await fs.promises.readFile(fullPath, "utf-8");
          const products = JSON.parse(data);
          const randomNumber = Math.random();
          const offset = (products.length - range - 1) * randomNumber;

          for (const product of products) {
            const {
              id,
              main_image: image,
              name,
              price,
              description,
              category,
              Specifications,
            } = product;
            const argumentObj = {
              image,
              name,
              category,
              price: Number(price.replace("৳", "").replace(",", "")),
              description,
              features: Object.entries(Specifications || {}),
            };

            try {
              await prisma.product.create({
                data: argumentObj,
              });
            } catch (error) {
              console.error("Error inserting data:", error);
            }
          }

          console.log(`${formatFileName(file)}s seeded successfully.`);
        } catch (error) {
          console.error(`Error seeding ${formatFileName(file)}s:`, error);
        }
      }
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }
}

export default seedProducts;
