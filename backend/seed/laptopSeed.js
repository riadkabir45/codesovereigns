import Laptop from '../model/Laptop.js';
import fs from 'fs';
import { join } from 'path';
import { root } from '../config/generalFunctions.js';

const range = 10;

async function seedLaptops() {
    try {
        const data = await fs.promises.readFile(join(root, 'sample', 'laptops.json'), 'utf-8'); 
        const laptops = JSON.parse(data);
        const lst = ['Processor Model', 'RAM', 'RAM Type', 'Display Resolution', 'Display Size'];
        const offset = (laptops.length - range - 1)*Math.random();
        
        for (const laptop of laptops.slice(offset, offset + range)) { 
            const { main_image, name, price, Specifications } = laptop;
            const features = Object.entries(Specifications);
            
            

            await Laptop.create({
                image: laptop['main_image'],
                name: laptop['name'],
                price: laptop['price'],
                features: Object.entries(Specifications)
            });
        }

        console.log('Laptops seeded successfully.');
    } catch (error) {
        console.error('Error seeding laptops:', error);
    }
}

export default seedLaptops;