import {Document, Model, model, Schema} from 'mongoose';

export abstract class BaseModel<TEntity extends Object, TDocument extends Document> {
	private _entityName: string;
	private tableModel: Model<TDocument>;

	constructor(entityName: string, entitySchema?: Schema) {
		this._entityName = entityName;
		this.tableModel = model<TDocument>(this._entityName, entitySchema);
	}

	async Insert(organisation: string, entity: TEntity): Promise<TDocument> {
		return this.tableModel.create({...entity, organisation: `organisation_${organisation}`});
	}

	async Update(organisation: string, id: string, entity: TEntity): Promise<TDocument | null> {
		return this.tableModel.findByIdAndUpdate(id, entity, {new: true});
	}

	async GetAll(organisation: string): Promise<TDocument[]> {
		return this.tableModel.find();
	}

	async GetById(organisation: string, id: string): Promise<TDocument | null> {
		return this.tableModel.findById(id);
	}
}
