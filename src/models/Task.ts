import sequelize from "../lib/db/sequelize";
import { DataTypes } from "sequelize";
import TaskStatus from "../enums/TaskStatus";

const Task = sequelize.define('Task', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true
	},
	status: {
		type: DataTypes.ENUM(...Object.values(TaskStatus)),
		allowNull: false
	}
}, {
	tableName: 'tasks',
});

export default Task;