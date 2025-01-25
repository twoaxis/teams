import Task from "../models/Task";
import User from "../models/User";

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
}

export default TaskService;