import seedProducts from './seed/prodcutSeed.js';
import seedUsers from './seed/userSeed.js';
import Product from './model/Product.js';
import User from './model/User.js';


for (const model of [Product,User]) {
    let table;
    try {
        table = await model();
        await table.sync({force: true});
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