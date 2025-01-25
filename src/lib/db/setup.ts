import sequelize from "./sequelize";
import User from "../../models/User";
import Permission from "../../models/Permission";

const setup = async () => {
	await sequelize.authenticate();

	User.hasMany(Permission, { foreignKey: "userId" });
	Permission.belongsTo(User, { foreignKey: "userId" });

	if(process.env.NODE_ENV !== 'production') {
		await sequelize.sync({ alter: true });
	}
}

export default setup;