import {Request, Response, NextFunction, Router} from 'express';
import * as ErrorHandler from '../core/errors';

export const handle404Error = (router: Router) => {
	router.use((req: Request, res: Response) => {
		ErrorHandler.notFoundError();
	});
};

export const handleClientError = (router: Router) => {
	router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		ErrorHandler.clientError(err, res, next);
	});
};

export const handleServerError = (router: Router) => {
	router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		ErrorHandler.serverError(err, res, next);
	});
};
