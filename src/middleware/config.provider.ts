
import {Request, Response, NextFunction} from 'express';
import * as fs from 'fs';
import * as path from 'path';
import {Config} from '../core/config';

export let config: Config;

export const loadConfig = (req: Request, res: Response, next: NextFunction) => {
	config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')).toString());
	next();
};
