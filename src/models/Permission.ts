import sequelize from "../lib/db/sequelize";
import { DataTypes } from "sequelize";
import Permissions from "../enums/Permissions";

const Permission = sequelize.define("Permission", {
	name: {
		type: DataTypes.ENUM(...Object.values(Permissions)),
		allowNull: false,
	}
}, {
	tableName: "permissions",
	timestamps: false,
});

export default Permission;