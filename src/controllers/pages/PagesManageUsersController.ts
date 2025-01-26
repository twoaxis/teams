import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import Permissions from "../../enums/Permissions";
import UserService from "../../services/UserService";
import UserNotFoundException from "../../exceptions/UserNotFoundException";

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
router.get("/:id", AuthMiddleware, async (req, res) => {
	const { id } = req.params;

	if(req["permissions"].includes(Permissions.MANAGE_USERS)) {
		try {
			const userService = new UserService();
			const user = await userService.getUser(parseInt(id));

			res.render("manage-user", { user });
		}
		catch (err) {
			if(err instanceof UserNotFoundException) {
				res.send("User Not found");
			}
			else {
				console.log(err);
				res.send("An unknown error occurred");
			}
		}
	}
	else {
		res.redirect("/dashboard");
	}
});

export default router;