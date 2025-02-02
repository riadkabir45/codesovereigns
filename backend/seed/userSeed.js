import fs from 'fs';
import { join } from 'path';
import root from '../function/root.js';
import { createUser } from '../service/userService.js';


async function seedUsers() {

    const dataFile = join(root, 'sample','users.json'); 
    try {
        const data = await fs.promises.readFile(dataFile, 'utf-8'); 
        const users = JSON.parse(data);
        
        for (const user of users) { 
            const { username, password } = user;
            try {
                await createUser(username,password);
                
            } catch (error) {
                console.error("Error inserting user:", username,error);
            }
        }

        console.log("Users seeded successfully.");
    } catch (error) {
        console.error("Error seeding users:", error);
    }
}

export default seedUsers;