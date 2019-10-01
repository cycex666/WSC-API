import {Document} from 'mongoose';

export interface Car {
	_id: string | any;
	vin: string;
	carModel: string;
	brand: string;
}

export interface CarEntity extends Car, Document {};
