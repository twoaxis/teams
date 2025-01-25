import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	const { token } = req.cookies;

	if (!token) {
		res.render("login");
	}
	else {
		res.redirect("/dashboard");
	}
});

export default router;