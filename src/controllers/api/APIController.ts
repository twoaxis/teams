import { Router } from "express";
import APIAuthController from "./APIAuthController";

const APIController = Router();

APIController.use("/auth", APIAuthController);

export default APIController;