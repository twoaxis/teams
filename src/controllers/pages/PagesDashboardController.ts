import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";

const router = Router();

router.get("/", AuthMiddleware, (req, res) => {
	res.render("dashboard", {
		permissions: req["permissions"]
	});
});

export default router;