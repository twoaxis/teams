import { Router } from "express";
import AuthService from "../../services/AuthService";
import UserAlreadyExistsException from "../../exceptions/UserAlreadyExistsException";
import AuthInvalidCredentialsException from "../../exceptions/AuthInvalidCredentialsException";

const APIAuthController = Router();

// TODO: Remove later
APIAuthController.post("/signup", async (req, res) => {
	const { username, password } = req.body;

	const authService = new AuthService();
	try {
		const token = await authService.signUp(username, password);

		res.json(token);
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

APIAuthController.post("/login", async (req, res) => {
	const { username, password } = req.body;

	const authService = new AuthService();

	try {
		if(!username || !password) {
			res.status(400).send();
		}
		else {

			const token = await authService.signIn(username, password);
			res.cookie("token", token, {
				maxAge: 12 * 60 * 60 * 1000,
				httpOnly: true,
				sameSite: true
			}).send();
		}
	}
	catch(error) {
		if(error instanceof AuthInvalidCredentialsException) {
			res.status(401).send();
		}
	}
})

export default APIAuthController;