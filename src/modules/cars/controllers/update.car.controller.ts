import {Request, Response, NextFunction} from 'express';
import ow from 'ow';

import {HTTP400Error} from '../../../core/errors';
import {CarsModel} from '../models';

export const exec = async (req: Request, res: Response): Promise<void> => {
	const {params, body} = req;
	const {organisation, id} = params;
	const model = new CarsModel();

	res.status(200).json(await model.Update(organisation, id, body));
};

export const validate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const {params, body} = req;
	const {id, organisation} = params;

	try {
		ow(organisation, 'organisation', ow.string.nonEmpty);
		ow(id, 'id', ow.string.nonEmpty);
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
