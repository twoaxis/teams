import { config as env } from "dotenv";

if(process.env.NODE_ENV !== "production") {
	env();
}

import express from "express";
import cookieParser from "cookie-parser";
import APIController from "./controllers/api/APIController";
import setup from "./lib/db/setup";

const app = express();

app.use(express.json());
app.use("/static", express.static("static"));
app.use(cookieParser());

app.use("/api", APIController);

(async () => {
	try {
		await setup();

		app.listen(process.env.PORT);
	} catch(error) {
		console.log(error)
	}
})();
