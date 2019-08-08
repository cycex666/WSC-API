import {Handler} from './handler';

export type Route = {
    path: string;
    method: string;
    handler: Handler | Handler[];
};