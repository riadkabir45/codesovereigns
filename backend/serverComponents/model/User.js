import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelizer from "../config/dbinit.js";

export default async () => {

    class User extends Model {}

    const sequelize = await sequelizer();

    User.init({
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        username:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        sequelize,
        modelName: "User"
    });

    await User.sync({ force: false });

    return User;
}