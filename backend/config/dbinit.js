import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
import { createLogger } from "./logger.js";

configDotenv();
let sequelizeInstance;

export default async() => {
    if(!sequelizeInstance){
        const logger = createLogger('db');

        const loggingFunction = (msg) => logger.info(msg);

        sequelizeInstance = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {
                host: process.env.DB_URL,
                dialect: 'postgres',
                logging: loggingFunction
            }
        );
        await sequelizeInstance.authenticate();
    }
    return sequelizeInstance;
};