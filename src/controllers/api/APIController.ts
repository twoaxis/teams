import { Router } from "express";
import APIAuthController from "./APIAuthController";
import APIUsersController from "./APIUsersController";

const APIController = Router();

APIController.use("/auth", APIAuthController);
APIController.use("/users", APIUsersController);

export default APIController;