import Laptop from '../models/Laptop.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import getRandomValueExcludingKeys from '../config/gen_funcs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

await fs.readFile(join(__dirname,'laptops.json'),'utf-8',(err,data) => {
    if(err){
        console.error('Error reading laptops.json: ', err);
    } else {
        try {
            const laptops = JSON.parse(data);
            const lst = ['Processor Model','RAM','RAM Type','Display Resolution','Display Size'];
            
            laptops.slice(0,10).forEach(async laptop => {
                await Laptop.create({
                    image: laptop['main_image'],
                    name: laptop['name'],
                    price: laptop['price'],
                    processor: laptop['Specifications']['Processor Model'],
                    ram: `${laptop['Specifications']['RAM']} ${laptop['Specifications']['RAM Type']}`,
                    display: `${laptop['Specifications']['Display Resolution']} ${laptop['Specifications']['Display Size']}`,
                    feature: laptop['Specifications'][getRandomValueExcludingKeys(laptop['Specifications'],lst)]
                });
            });
        } catch (error) {
            console.error('Error parsing laptops.json: ', error);
        }
    }
})


// const newLaptop = await Laptop.create({
//     username: 'riadkabir45',
//     password: 'riadkabir45',
//   });