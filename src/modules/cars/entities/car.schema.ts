import {Schema} from 'mongoose';
import {BaseSchema} from '../../../core/db';

export const CarSchema = new Schema({
	...BaseSchema.obj,
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
