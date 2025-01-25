import sequelize from "./sequelize";
import User from "../../models/User";
import Permission from "../../models/Permission";
import Task from "../../models/Task";

const setup = async () => {
	await sequelize.authenticate();

	User.hasMany(Permission, { foreignKey: "userId" });
	Permission.belongsTo(User, { foreignKey: "userId" });

	User.belongsTo(User, { foreignKey: "reportingTo", as: "manager" });

	Task.belongsTo(User, { foreignKey: "assignedTo" });
	Task.belongsTo(User, { foreignKey: "userId", as: "manager" });

	if(process.env.NODE_ENV !== 'production') {
		await sequelize.sync({ alter: true });
	}
}

export default setup;