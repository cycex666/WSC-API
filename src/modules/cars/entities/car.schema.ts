import {BaseSchema} from '../../../core';
import {Schema} from 'mongoose';

export const CarSchema = new Schema({
	vin: {
		type: String,
		required: `Field 'vin' is required`
	},
	carModel: {
		type: String,
		required: `Field 'carModel' is required`
	},
	brand: {
		type: String,
		required: `Field 'brand' is required`
	}
});


