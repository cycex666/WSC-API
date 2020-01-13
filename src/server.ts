import * as dotenv from 'dotenv';
import http from 'http';
import express, { Express } from 'express';
import { applyMiddleware, applyRoutes } from './core';
import { routes } from './modules/routes';
import * as path from 'path';
import * as middleware from './middleware';
import * as errorHandlers from './middleware/errorHandlers';

export class App {
	router: Express;
	server: http.Server;

	constructor() {
		this.router = express();
		const result = dotenv.config({ path: path.join(__dirname, '.env') });

		if (result.error) {
			throw result.error.message;
		}

		this.router = this.initialize();

		const { PORT, NODE_ENV } = process.env;

		this.server = http.createServer(this.router);

		if (NODE_ENV !== 'test') {
			this.server.listen(PORT, () =>
				console.log(`Server is running http://localhost:${PORT}...`)
			);
		}
	}

	initialize(): express.Express {
		process.on('uncaughtException', e => {
			console.log(e);
			process.exit(1);
		});
		process.on('unhandledRejection', e => {
			console.log(e);
			process.exit(1);
		});

		applyMiddleware(Object.values(middleware), this.router);
		applyRoutes(routes, this.router);
		applyMiddleware(Object.values(errorHandlers), this.router);

		return this.router;
	}
}

export const app = new App();
