import {Router, Request, Response, NextFunction} from "express";
import dotenv from "dotenv";

type Wrapper = (router: Router) => void;

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router) => {
	for (const wrapper of middlewareWrappers) {
		wrapper(router);
	}
};

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

type Route = {
	path: string;
	method: string;
	handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route[], router: Router) => {
	for (const route of routes) {
		console.log("api version: " + process.env.API_VERSION);
		const {method, path, handler} = route;
		let apiPath = `/api/${process.env.API_VERSION}${path}`;
		(router as any)[method](apiPath, handler);
	}
};
