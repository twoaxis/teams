import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import TaskService from "../../services/TaskService";
import task from "../../models/Task";

const router = Router();

router.get("/", AuthMiddleware, async (req, res) => {
	const taskService = new TaskService();

	const tasks = await taskService.getTasksAssignedToUser(req["uid"]);

	res.render("tasks", { tasks: tasks });
});

router.get("/:id", AuthMiddleware, async (req, res) => {
	const { id } = req.params;

	const taskService = new TaskService();

	const task = await taskService.getUserTaskById(req["uid"], parseInt(id));

	if(task) {
		res.render("task", { task });
	}
	else {
		res.send("Task not found");
	}
})
export default router;