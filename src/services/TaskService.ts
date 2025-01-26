import Task from "../models/Task";
import User from "../models/User";
import TaskStatus from "../enums/TaskStatus";

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
		await Task.update({
			status: taskStatus
		}, {
			where: {
				id: taskId,
				assignedTo: userId,
			}
		});
	}
}

export default TaskService;