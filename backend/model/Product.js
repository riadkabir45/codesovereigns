import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../config/dbinit.js";

class Product extends Model {}

Product.init({
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    category:{
        type: DataTypes.STRING,
        allowNull: true
    },
    price:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description:{
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
    modelName: "Product"
});

await Product.sync({ force: false });

export default Product;