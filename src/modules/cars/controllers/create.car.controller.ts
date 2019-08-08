import {Request, Response, NextFunction} from 'express';

export const exec = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send('test OK');
}