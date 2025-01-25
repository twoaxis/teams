import { Router } from "express";
import router from "./Router";
import APIUsersController from "./APIUsersController";

const APIController = Router();

APIController.use("/auth", router);
APIController.use("/users", APIUsersController);

export default APIController;