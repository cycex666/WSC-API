import {Request, Response, NextFunction} from 'express';
import ow from 'ow';

import {HTTP400Error} from '../../../core/errors';

export const exec = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send(JSON.stringify({test: '1', test2: '2'}, undefined, '\t'));
}

export const validate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {carId} = req.params;
    try {
        ow(carId, 'carId', ow.string.nonEmpty.numeric);
        next();
    } catch (err) {
        throw new HTTP400Error(err.message);
    }
};