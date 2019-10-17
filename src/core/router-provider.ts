import {Router, Request, Response, NextFunction} from 'express';
import {Route} from './route';
import {authorize} from './authorize';

export const applyRoutes = (routes: Route[], router: Router) => {
	for (const route of routes) {
		const {method, path, handler} = route;
		const API_VERSION = 'v1';
		const apiPath = `/api/${API_VERSION}${path}`;

		(router as any)[method](apiPath, route.authorize ? [authorize, ...handler] : handler);
	}
};
