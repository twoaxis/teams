import { Router } from "express";
import PagesRootController from "./PagesRootController";
import PagesDashboardController from "./PagesDashboardController";

const router = Router();

router.use("/", PagesRootController);
router.use("/dashboard", PagesDashboardController);

export default router;