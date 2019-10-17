import {Route} from '../../core';
import * as controller from './controllers';

export const routes: Route[] = [
	{
		path: '/oauth/login',
		method: 'post',
		handler: [controller.login.validate, controller.login.exec]
	},
];
