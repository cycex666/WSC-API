import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Config } from '../core/config';

export let config: Config;

export const loadConfig = (req: Request, res: Response, next: NextFunction) => {
	const envMode: any = process.env.NODE_ENV;
	config = JSON.parse(
		fs.readFileSync(path.join(__dirname, '..', 'config.json')).toString()
	)[envMode];
	next();
};
