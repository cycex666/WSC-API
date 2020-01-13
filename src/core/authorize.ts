import { Request, Response, NextFunction } from 'express';
import * as jwtToken from 'jsonwebtoken';
import { HTTP401Error } from './errors';
import { config } from '../middleware/config.provider';

export const authorize = async (req: Request, res: Response): Promise<void> => {
	const { Secret } = config.OAuth;
	let token = req.header('x-access-token') || req.header('authorization');

	console.log(token);

	if (!token) {
		throw new HTTP401Error();
	}

	if (process.env.NODE_ENV === 'test' && token === 'avatestoauthtoken') {
	} else {
		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
		}

		jwtToken.verify(token, Secret, (err, decoded) => {
			if (err) {
				throw new HTTP401Error();
			}
		});
	}
};
