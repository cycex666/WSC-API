import {Request, Response, NextFunction} from 'express';
import ow from 'ow';

import {HTTP400Error} from '../../../core/errors';

import {CarsModel} from '../models';

export const exec = async (req: Request, res: Response): Promise<void> => {
	const {organisation, id} = req.params;
	const model = new CarsModel();

	res.status(200).json(await model.GetById(organisation, id));
};

export const validate = async (req: Request, res: Response): Promise<void> => {
	const {id, organisation} = req.params;

	try {
		ow(organisation, 'organisation', ow.string.nonEmpty);
		ow(id, 'id', ow.string.nonEmpty);
	} catch (err) {
		throw new HTTP400Error(err.message);
	}
};
