import seedProducts from './serverComponents/seed/prodcutSeed.js';

const dbSeed = async () => {
    await seedUsers();
    await seedProducts();
}

dbSeed();

export default dbSeed;