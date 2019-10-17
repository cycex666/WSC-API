import {Schema} from 'mongoose';

export const BaseSchema = new Schema({
	_id: String,
	organisation: String
});
