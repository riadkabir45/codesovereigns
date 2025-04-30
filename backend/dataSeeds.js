import seedProducts from "./serverComponents/seed/prodcutSeed.js";
import seedUsers from "./serverComponents/seed/userSeed.js";
const dbSeed = async () => {
  await seedUsers();
  await seedProducts();
};

dbSeed();

export default dbSeed;
