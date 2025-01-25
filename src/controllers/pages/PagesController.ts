import { Router } from "express";
import PagesRootController from "./PagesRootController";
import PagesDashboardController from "./PagesDashboardController";
import PagesManageUsersController from "./PagesManageUsersController";

const router = Router();

router.use("/", PagesRootController);
router.use("/dashboard", PagesDashboardController);
router.use("/manage-users", PagesManageUsersController);

export default router;