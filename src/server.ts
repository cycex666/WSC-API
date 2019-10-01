import http from 'http';
import express from 'express';
import {applyMiddleware, applyRoutes} from './core';
import routes from './modules/routes';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';

export class App {
	router = express();
	server: http.Server;

	constructor() {
		this.server = this.initialize();
		const {PORT = 3000} = process.env;
		this.server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
	};

	initialize(): http.Server {
		process.on('uncaughtException', e => {
			console.log(e);
			process.exit(1);
		});
		process.on('unhandledRejection', e => {
			console.log(e);
			process.exit(1);
		});


		applyMiddleware(middleware, this.router);
		applyRoutes(routes, this.router);
		applyMiddleware(errorHandlers, this.router);

		return http.createServer(this.router);
	};
}

export default new App();
