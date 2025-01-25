import { Router } from "express";
import AuthService from "../../services/AuthService";
import AuthInvalidCredentialsException from "../../exceptions/AuthInvalidCredentialsException";

const router = Router();

router.post("/login", async (req, res) => {
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
});

router.post("/logout", async (req, res) => {
	const { token } = req.cookies;

	const authService = new AuthService();

	try {
		await authService.logOut(token);

		res.clearCookie("token").send();
	}
	catch (error) {
		res.status(500).send();
	}
})

export default router;