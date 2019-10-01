import {Route} from '../../core';
import * as controller from './controllers';

export const routes: Route[] = [
	{
		path: '/:organisation/car',
		method: 'post',
		handler: [controller.create.validate, controller.create.exec]
	},
	{
		path: '/:organisation/car/:id',
		method: 'put',
		handler: [controller.update.validate, controller.update.exec]
	},
	{
		path: '/:organisation/cars',
		method: 'get',
		handler: [controller.getAll.validate, controller.getAll.exec]
	},
	{
		path: '/:organisation/car/:id',
		method: 'get',
		handler: [controller.getOne.validate, controller.getOne.exec]
	}
];
