import {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import {config} from './config.provider';

export const setupMongodb = (req: Request, res: Response, next: NextFunction) => {
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);

	mongoose.Promise = global.Promise;

	mongoose.connect(config.MongoDB.host, {useNewUrlParser: true});

	console.log('DB Connected');

	res.on('finish', () => {
		mongoose.disconnect();
		console.log('DB Disconnected');
	});

	next();
};
