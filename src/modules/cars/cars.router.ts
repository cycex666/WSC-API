import {Route} from '../../core';
import {create, getAll} from './controllers';
export const routes: Route[] = [
    {
        path: '/cars',
        method: 'post',
        handler: [create.exec]
    },
    {
        path: '/cars/:carId',
        method: 'get',
        handler: [getAll.validate, getAll.exec]
    }
];