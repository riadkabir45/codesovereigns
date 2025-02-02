import seedProducts from './serverComponents/seed/prodcutSeed.js';
import seedUsers from './serverComponents/seed/userSeed.js';
import Product from './serverComponents/model/Product.js';
import User from './serverComponents/model/User.js';


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