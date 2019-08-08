import {Router} from 'express';
import {Route} from './route';

export const applyRoutes = (routes: Route[], router: Router) => {
    for (const route of routes) {
        console.log("api version: " + process.env.API_VERSION);
        const {method, path, handler} = route;
        const API_VERSION = 'v1';
        console.log('apiV : ' + API_VERSION);
        let apiPath = `/api/${API_VERSION}${path}`;
        (router as any)[method](apiPath, handler);
    }
};