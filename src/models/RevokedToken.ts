import sequelize from "../lib/db/sequelize";
import { DataTypes } from "sequelize";

const RevokedToken = sequelize.define('RevokedToken', {
	token: {
		type: DataTypes.STRING,
		allowNull: false,
	}
}, {
	tableName: "revoked_tokens",
	timestamps: false,
});

export default RevokedToken;