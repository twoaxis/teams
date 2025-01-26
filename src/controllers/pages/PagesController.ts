import { Router } from "express";
import PagesRootController from "./PagesRootController";
import PagesDashboardController from "./PagesDashboardController";
import PagesManageUsersController from "./PagesManageUsersController";
import PagesTasksController from "./PagesTasksController";
import PagesManageTasksController from "./PagesManageTasksController";

const router = Router();

router.use("/", PagesRootController);
router.use("/dashboard", PagesDashboardController);
router.use("/manage-users", PagesManageUsersController);
router.use("/tasks", PagesTasksController);
router.use("/manage-tasks", PagesManageTasksController);

export default router;