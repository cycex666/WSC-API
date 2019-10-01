import ow from 'ow';
import {HTTP400Error} from '../../../core/errors';
import {Request, Response, NextFunction} from 'express';
import * as model from '../models';
import bodyParser = require('body-parser');

export const exec = async (req: Request, res: Response): Promise<void> => {
	const {params, body} = req;
	const {organisation} = params;
	console.log(body);
	res.status(200).json(await model.Insert(organisation, body));
};

export const validate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const {params, body} = req;
	const {organisation} = params;
	try {
		ow(organisation, 'organisation', ow.string.nonEmpty);
		ow(body, 'body', ow.object.nonEmpty.exactShape({
			vin: ow.string.nonEmpty,
			carModel: ow.string.nonEmpty,
			brand: ow.string.nonEmpty
		}));
		next();
	} catch (err) {
		throw new HTTP400Error(err.message);
	}
};
