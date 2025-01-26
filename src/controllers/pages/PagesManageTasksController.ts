import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import Permissions from "../../enums/Permissions";
import UserService from "../../services/UserService";
import UserNotFoundException from "../../exceptions/UserNotFoundException";
import taskService from "../../services/TaskService";
import TaskService from "../../services/TaskService";

const router = Router();

router.get("/", AuthMiddleware, async (req, res) => {
	if(req["permissions"].includes(Permissions.MANAGE_TASKS)) {
		const userService = new UserService();
		const users = await userService.getUsersReportingToUser(req["uid"]);

		res.render("manage-tasks", {
			users
		});
	}
	else {
		res.redirect("/dashboard");
	}
});
router.get("/:id", AuthMiddleware, async (req, res) => {
	const { id } = req.params;

	if(req["permissions"].includes(Permissions.MANAGE_TASKS)) {
		const taskService = new TaskService();
		const userService = new UserService();

		const user = await userService.getUser(parseInt(id));
		const tasks = await taskService.getTasksAssignedToUser(parseInt(id));

		res.render("manage-tasks-user", {
			user,
			tasks
		});
	}
	else {
		res.redirect("/dashboard");
	}
});

export default router;