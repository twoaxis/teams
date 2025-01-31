import sequelize from "./sequelize";
import User from "../../models/User";
import Permission from "../../models/Permission";
import Task from "../../models/Task";

const setup = async () => {
	await sequelize.authenticate();

	User.hasMany(Permission, { foreignKey: "userId", as: "permissions" });
	Permission.belongsTo(User, { foreignKey: "userId", as: "permissions" });

	User.belongsTo(User, { foreignKey: "reportingTo", as: "manager" });

	Task.belongsTo(User, { foreignKey: "assignedTo", as: "assignee" });
	Task.belongsTo(User, { foreignKey: "userId", as: "manager" });

	if(process.env.NODE_ENV !== 'production') {
		await sequelize.sync({ alter: true });
	}
}

export default setup;