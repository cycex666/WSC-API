import {Schema, model} from 'mongoose';
import {CarSchema, CarEntity, Car} from '../entities';
import {uniqueId} from '../../../utils';

const entity = 'Cars';

const CarTable = model<CarEntity>(entity, CarSchema);

export const Insert = async (organisation: string, car: Car): Promise<Car> => {
	const model = new CarTable({...car, partitionKey: `organisation_${organisation}`});
	return model.save()
};

export const Update = async (organisation: string, id: string, car: Car): Promise<Car | null> => {
	return CarTable.findByIdAndUpdate(id, car, {new: true});
}

export const GetAll = async (organisation: string): Promise<Car[]> => {
	return CarTable.find();
};

export const GetById = async (organisation: string, id: string): Promise<Car | null> => {
	return CarTable.findById(id);
};

const combineSchemas = (...schemas: Schema[]): Schema => {
	let outSchema = new Schema();
	for (const schema of schemas) {
		console.log(schema);
	}
	return outSchema;
}
