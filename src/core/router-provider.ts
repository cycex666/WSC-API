import { Router, Request, Response, NextFunction } from "express";
import { Route } from "./route";
import { authorize } from "./authorize";

export const applyRoutes = (routes: Route[], router: Router) => {
	for (const route of routes) {
		const { method, path, handler } = route;
		const { API_VERSION } = process.env;
		const apiPath = `/api/${API_VERSION}${path}`;

		(router as any)[method](
			apiPath,
			async (
				req: Request,
				res: Response,
				next: NextFunction
			): Promise<void> => {
				if (route.authorize) {
					await authorize(req, res);
				}
				for (const func of handler) {
					await func(req, res);
				}
				next();
			}
		);
	}
};
