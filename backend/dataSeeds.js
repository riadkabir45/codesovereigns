import seedProducts from './seed/prodcutSeed.js';
import seedUsers from './seed/userSeed.js';
import { getUser, updateUserPassword } from './service/userService.js';
import Product from './model/Product.js';
import User from './model/User.js';


for (const model of [Product,User]) {
    let table;
    try {
        table = await model();
        table.truncate({ cascade: true })
    } catch (error) {
        console.error('Error droping table:',table);
    }
};

const dbSeed = async () => {
    await seedUsers();
    await seedProducts();
}

dbSeed();

export default dbSeed;