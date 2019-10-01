import {Router} from 'express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import {loadConfig} from './config.provider';
import * as dbConnector from './mongodb.setup';

export const handleCors = (router: Router) =>
	router.use(cors({credentials: true, origin: true}));

export const handleBodyRequestParsing = (router: Router) => {
	router.use(parser.urlencoded({extended: true}));
	router.use(parser.json());
};

export const handleCompression = (router: Router) => {
	router.use(compression());
};

export const applyConfig = (router: Router) => router.use(loadConfig);

export const setupDb = (router: Router) => router.use(dbConnector.setupMongodb);
