import ow from 'ow';
import {HTTP400Error, HTTP401Error, HTTPClientError} from '../../../core/errors';
import {Response, NextFunction} from 'express';
import {Request} from '../entities';
import {AuthenticationModel} from '../model';

export const exec = async (req: Request.LoginRequest, res: Response): Promise<void> => {
	try {
		const {login, password} = req.body;
		const model = new AuthenticationModel();
		const tokenResponse = await model.tryLogin(login, password);

		res.status(200).json(tokenResponse);
	} catch (err) {
		if (err instanceof HTTP401Error) {
			throw err;
		}
		console.log(typeof err);
		throw new HTTP400Error(err.message);
	}
};

export const validate = async (req: Request.LoginRequest, res: Response, next: NextFunction): Promise<void> => {
	const {body} = req;

	try {
		ow(body, 'body', ow.object.nonEmpty.exactShape({
			organisation: ow.string.nonEmpty,
			login: ow.string.nonEmpty,
			password: ow.string.nonEmpty
		}));
		next();
	} catch (err) {
		throw new HTTP400Error(err.message);
	}
};
