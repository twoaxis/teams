import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import TaskService from "../../services/TaskService";

const router = Router();

router.get("/", AuthMiddleware, async (req, res) => {
	const taskService = new TaskService();

	const tasks = await taskService.getTasksAssignedToUser(req["uid"]);

	res.render("tasks", { tasks: tasks });
});
export default router;