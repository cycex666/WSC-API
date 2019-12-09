import ow from 'ow';
import {HTTP400Error, HTTP401Error} from '../../../core/errors';
import {Response, NextFunction} from 'express';
import {Request} from '../entities';
import {UserModel} from '../model';

export const exec = async (req: Request.SignupRequest, res: Response): Promise<void> => {
	try {
		const {params: {organisation}, body} = req;
		const model = new UserModel();
		const user = await model.singUp(organisation, body);

		res.status(200).json(user);
	} catch (err) {
		if (err instanceof HTTP401Error) {
			throw err;
		}

		throw new HTTP400Error(err.message);
	}
};

export const validate = async (req: Request.SignupRequest): Promise<void> => {
	const {params: {organisation}, body} = req;

	try {
		ow(organisation, 'organisation', ow.string.nonEmpty);
		ow(body, 'body', ow.object.nonEmpty.exactShape({
			firstName: ow.string.nonEmpty,
			name: ow.string.nonEmpty,
			email: ow.string.nonEmpty,
			password: ow.string.nonEmpty.minLength(6)
		}));
	} catch (err) {
		throw new HTTP400Error(err.message);
	}
};
