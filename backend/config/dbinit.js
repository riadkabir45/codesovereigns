import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_URL,
        dialect: 'postgres',
        logging: console.log
    }
);


export default async() => {
    await sequelize.authenticate();
    return sequelize;
};