import * as carRoutes from './cars/cars.router';
import * as authorizerRoutes from './authentication/authentication.router';

export const routes = [...carRoutes.routes, ...authorizerRoutes.routes];
