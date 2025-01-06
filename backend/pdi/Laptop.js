import Laptop from '../models/Laptop.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import getRandomValueExcludingKeys from '../config/gen_funcs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const range = 10;

async function seedLaptops() {
    try {
        const data = await fs.promises.readFile(join(__dirname, 'laptops.json'), 'utf-8'); 
        const laptops = JSON.parse(data);
        const lst = ['Processor Model', 'RAM', 'RAM Type', 'Display Resolution', 'Display Size'];

        const offset = (laptops.length - range - 1)*Math.random();
        

        for (const laptop of laptops.slice(offset, offset + range)) { 
            const { main_image, name, price, Specifications } = laptop;

            await Laptop.create({
                image: laptop['main_image'],
                name: laptop['name'],
                price: laptop['price'],
                processor: Specifications['Processor Model'] || Specifications['Processor'],
                ram: `${Specifications['RAM']} ${Specifications['RAM Type']}`,
                display: `${Specifications['Display Resolution']} ${Specifications['Display Size']}`,
                feature: Specifications[getRandomValueExcludingKeys(Specifications, lst)],
            });
        }

        console.log('Laptops seeded successfully.');
    } catch (error) {
        console.error('Error seeding laptops:', error);
    }
}

export default seedLaptops;