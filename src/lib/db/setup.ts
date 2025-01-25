import sequelize from "./sequelize";
import User from "../../models/User";
import Permission from "../../models/Permission";

const setup = async () => {
	await sequelize.authenticate();

	User.hasMany(Permission, { foreignKey: "userId" });
	Permission.belongsTo(User, { foreignKey: "userId" });

	User.hasMany(User, { foreignKey: "reportingTo" });
	User.belongsTo(User, { foreignKey: "reportingTo" });

	if(process.env.NODE_ENV !== 'production') {
		await sequelize.sync({ alter: true });
	}
}

export default setup;