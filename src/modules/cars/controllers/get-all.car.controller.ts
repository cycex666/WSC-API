import {Request, Response, NextFunction} from 'express';
import ow from 'ow';

import {HTTP400Error} from '../../../core/errors';

import * as model from '../models';

export const exec = async (req: Request, res: Response): Promise<void> => {
	const {organisation} = req.params;

	res.status(200).json({cars: await model.GetAll(organisation)});
};

export const validate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const {carId, organisation} = req.params;

	try {
		ow(organisation, 'organisation', ow.string.nonEmpty);

		next();
	} catch (err) {
		throw new HTTP400Error(err.message);
	}
};
