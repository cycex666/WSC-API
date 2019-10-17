import {Handler} from './handler';

export type Route = {
	path: string;
	method: string;
	authorize?: boolean;
	handler: Handler[];
};
