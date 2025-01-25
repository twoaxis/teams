import { Router } from "express";
import APIAuthController from "./APIAuthController";
import APIUsersController from "./APIUsersController";
import APITasksController from "./APITasksController";

const APIController = Router();

APIController.use("/auth", APIAuthController);
APIController.use("/users", APIUsersController);
APIController.use("/tasks", APITasksController);

export default APIController;