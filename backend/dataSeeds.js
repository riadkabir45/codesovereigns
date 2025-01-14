
import seedLaptop from './seed/laptopSeed.js';
import sequelize from './config/dbinit.js';

try {
    const models = Object.keys(sequelize.model);
    models.forEach(model => {
        const Model = sequelize.model[model];
        Model.drop();
    });
    await sequelize.sync({ force: true }); 

} catch (error) {
    console.error("Error seeding data: ",error);
    
}

seedLaptop();