import {CarSchema, CarEntity, Car} from '../entities';
import {BaseModel} from '../../../core/model';

export class CarsModel extends BaseModel<Car, CarEntity> {
	constructor() {
		super('Cars', CarSchema);
	}
}
