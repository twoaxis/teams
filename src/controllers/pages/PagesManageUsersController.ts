import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import Permissions from "../../enums/Permissions";
import UserService from "../../services/UserService";

const router = Router();

router.get("/", AuthMiddleware, async (req, res) => {
	if(req["permissions"].includes(Permissions.MANAGE_USERS)) {
		const userService = new UserService();
		const users = await userService.getAllUsers();

		res.render("manage-users", {
			users
		});
	}
	else {
		res.redirect("/dashboard");
	}
});
router.get("/new", AuthMiddleware, async (req, res) => {
	if(req["permissions"].includes(Permissions.MANAGE_USERS)) {
		const userService = new UserService();
		const users = await userService.getAllUsers();

		res.render("new-user", { users });
	}
	else {
		res.redirect("/dashboard");
	}
});

export default router;