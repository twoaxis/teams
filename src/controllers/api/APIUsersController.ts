import { Router } from "express";
import AuthService from "../../services/AuthService";
import UserAlreadyExistsException from "../../exceptions/UserAlreadyExistsException";
import * as crypto from "node:crypto";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import Permissions from "../../enums/Permissions";

const router = Router();

router.put("/", AuthMiddleware, async (req, res) => {
	let { name, username, password, reportingTo } = req.body;

	const authService = new AuthService();
	try {

		if(!req["permissions"].includes(Permissions.MANAGE_USERS)) {
			res.status(401).send();
		}
		else if(typeof reportingTo === "string") {
			res.status(400).send();
		}
		else {
			if(!password) {
				const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
				const passwordArray = Array.from(crypto.randomBytes(10), (byte) => chars[byte % chars.length]);
				password = passwordArray.join('');
			}
			await authService.createUser(name, username, password, reportingTo);

			res.json({
				name,
				username,
				password,
			});
		}
	}
	catch (error) {
		if(error instanceof UserAlreadyExistsException) {
			res.status(409).json();
		}
		else {
			console.log(error);
			res.status(500).json({ error: "Something went wrong" });
		}
	}
});
router.put("/:id", AuthMiddleware, async (req, res) => {
	const { permission } = req.body;
	const { id } = req.params;

	const authService = new AuthService();
	try {

		if (!req["permissions"].includes(Permissions.MANAGE_USERS)) {
			res.status(401).send();
		}
		else if(!permission) {
			res.status(400).send();
		}
		else {
			await authService.addPermission(parseInt(id), permission);

			res.status(200).send();
		}
	}
	catch(error) {
		res.status(500).json({ error: "Something went wrong" });
	}
});
router.delete("/:id", AuthMiddleware, async (req, res) => {
	const { permission } = req.body;
	const { id } = req.params;

	const authService = new AuthService();
	try {

		if (!req["permissions"].includes(Permissions.MANAGE_USERS)) {
			res.status(401).send();
		}
		else if(!permission) {
			res.status(400).send();
		}
		else {
			await authService.removePermission(parseInt(id), permission);

			res.status(200).send();
		}
	}
	catch(error) {
		res.status(500).json({ error: "Something went wrong" });
	}
});
export default router;