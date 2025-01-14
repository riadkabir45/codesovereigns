import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbinit.js";

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
    price:{
        type: DataTypes.STRING,
        allowNull: true
    },
    features:{
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    }
},{
    sequelize,
    modelName: "laptop"
});

await Laptop.sync({ force: false });

export default Laptop;