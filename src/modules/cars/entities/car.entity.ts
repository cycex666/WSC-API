import {Document} from 'mongoose';
import {EntityBase} from '../../../core/db';

export interface Car extends EntityBase {
	vin: string;
	carModel: string;
	brand: string;
}

export interface CarEntity extends Car, Document {}
