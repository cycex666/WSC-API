import * as dotenv from "dotenv";
import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./core";
import { routes } from "./modules/routes";
import * as path from "path";
import * as middleware from "./middleware";
import * as errorHandlers from "./middleware/errorHandlers";

export class App {
	router = express();
	server: http.Server;

	constructor() {
		const result = dotenv.config({ path: path.join(__dirname, ".env") });

		if (result.error) {
			throw result.error.message;
		}

		this.server = this.initialize();

		const { PORT } = process.env;

		this.server.listen(PORT, () =>
			console.log(`Server is running http://localhost:${PORT}...`)
		);
	}

	initialize(): http.Server {
		process.on("uncaughtException", e => {
			console.log(e);
			process.exit(1);
		});
		process.on("unhandledRejection", e => {
			console.log(e);
			process.exit(1);
		});

		applyMiddleware(Object.values(middleware), this.router);
		applyRoutes(routes, this.router);
		applyMiddleware(Object.values(errorHandlers), this.router);

		return http.createServer(this.router);
	}
}

export const app = new App();
