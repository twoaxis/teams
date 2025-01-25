import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import TaskService from "../../services/TaskService";

const router = Router();

router.post("/:id", AuthMiddleware, async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;

	const taskService = new TaskService();

	await taskService.updateTaskStatus(req["uid"], parseInt(id), status);
	res.status(200).send();
});

export default router;