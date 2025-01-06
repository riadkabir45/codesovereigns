
import data from './config/init.js';
import seedLaptop from './pdi/Laptop.js';
import sequelize from './config/init.js';

try {
    const models = Object.keys(sequelize.model);
    models.forEach(model => {
        const Model = sequelize.model[model];
        Model.drop();
    });
} catch (error) {
    console.error("Error seeding data: ",error);
    
}

seedLaptop();