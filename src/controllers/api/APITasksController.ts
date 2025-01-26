import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import TaskService from "../../services/TaskService";
import Permissions from "../../enums/Permissions";

const router = Router();

router.post("/:id", AuthMiddleware, async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;

	const taskService = new TaskService();

	await taskService.updateTaskStatus(req["uid"], parseInt(id), status);
	res.status(200).send();
});
router.put("/:assignedTo", AuthMiddleware, async (req, res) => {
	const { assignedTo } = req.params;
	const { title, description } = req.body;

	try {
		if(!req["permissions"].includes(Permissions.MANAGE_TASKS)) {
			res.status(401).send();
		}
		else {
			const taskService = new TaskService();
			await taskService.createTask(title, description, req["uid"], parseInt(assignedTo));

			res.status(200).send();
		}
	}
	catch (error) {
		console.error(error)
		res.status(500).send();
	}
})

export default router;