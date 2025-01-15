import Laptop from '../model/Laptop.js';
import fs from 'fs';
import { join } from 'path';
import { root } from '../config/generalFunctions.js';

const range = 10;

async function seedLaptops() {
    try {
        const data = await fs.promises.readFile(join(root, 'sample', 'laptops.json'), 'utf-8'); 
        const laptops = JSON.parse(data);
        const randomNumber = Math.random()
        const offset = (laptops.length - range - 1)*randomNumber;
        
        for (const laptop of laptops.slice(offset, offset + range)) { 
            const { main_image: image, name, price, description, Specifications } = laptop;
            const argumentObj = {image , name, price, description, features: Object.entries(Specifications)};
            await Laptop.create(argumentObj);
        }

        console.log('Laptops seeded successfully.');
    } catch (error) {
        console.error('Error seeding laptops:', error);
    }
}

export default seedLaptops;