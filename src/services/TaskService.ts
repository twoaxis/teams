import Task from "../models/Task";
import User from "../models/User";
import TaskStatus from "../enums/TaskStatus";
import task from "../models/Task";
import { Op } from "sequelize";

class TaskService {
	async getTasksAssignedToUser(userId: number) {
		return Task.findAll({
			where: {
				assignedTo: userId
			},
			include: {
				model: User,
				foreignKey: "userId",
				as: "manager"
			}
		});
	}
	async getUserTaskById(userId: number, taskId: number) {
		return Task.findOne({
			where: {
				id: taskId,
				assignedTo: userId
			},
			include: {
				model: User,
				foreignKey: "userId",
				as: "manager"
			}
		});
	}
	async createTask(title: string, description: string, userId: number, assignedTo: number) {
		await Task.create({
			title,
			description,
			status: "ready",
			userId,
			assignedTo
		});
	}
	async updateTaskStatus(userId: number, taskId: number, taskStatus: TaskStatus) {
		const task = await Task.findOne({
			where: {
				[Op.and]: [
					{ id: taskId },
					{
						[Op.or]: [
							{ userId: userId },
							{ assignedTo: userId }
						]
					}
				]
			}
		});

		if (!task) throw new TaskNotFoundException();
		await Task.update({
			status: taskStatus
		}, {
			where: {
				[Op.and]: [
					{ id: taskId },
					{
						[Op.or]: [
							{ userId: userId },
							{ assignedTo: userId }
						]
					}
				]
			}
		});
	}
}

export default TaskService;