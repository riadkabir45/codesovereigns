import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv();
let sequelizeInstance;

export default async() => {
    if(!sequelizeInstance){
        sequelizeInstance = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {
                host: process.env.DB_URL,
                dialect: 'postgres',
                logging: console.log
            }
        );
        await sequelizeInstance.authenticate();
    }
    return sequelizeInstance;
};