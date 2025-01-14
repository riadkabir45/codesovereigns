import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'postgres',
    'postgres.myiejrsnpkxzfewzgtgn',
    'postgressoverign',
    {
        host: 'aws-0-ap-south-1.pooler.supabase.com',
        dialect: 'postgres',
        logging: console.log
    }
);

await sequelize.authenticate();

export default sequelize;