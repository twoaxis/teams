import { Router } from "express";
import PagesRootController from "./PagesRootController";
import PagesDashboardController from "./PagesDashboardController";
import PagesManageUsersController from "./PagesManageUsersController";
import PagesTasksController from "./PagesTasksController";

const router = Router();

router.use("/", PagesRootController);
router.use("/dashboard", PagesDashboardController);
router.use("/manage-users", PagesManageUsersController);
router.use("/tasks", PagesTasksController);

export default router;