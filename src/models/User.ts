import sequelize from "../lib/db/sequelize";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	}
}, {
	tableName: "users",

});

export default User;