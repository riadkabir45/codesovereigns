import { DataTypes, Model } from "sequelize";
import sequelize from "../config/init.js";

class Laptop extends Model {}

Laptop.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    processor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ram:{
        type: DataTypes.STRING,
        allowNull: false
    },
    display:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize,
    modelName: "laptop"
});

await Laptop.sync({ force: true });

export default Laptop;