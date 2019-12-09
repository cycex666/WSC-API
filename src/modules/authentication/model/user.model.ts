import {BaseModel} from "../../../core/model";
import {UserDTO, User, UserEntity, UserSchema} from '../entities';
import {UserRole} from '../enums/user-role.enum';
import {uniqueId} from "../../../utils";

export class UserModel extends BaseModel<User, UserEntity>{
	constructor() {
		super('application_users', UserSchema);
	}

	async singUp(organisation: string, userDto: UserDTO): Promise<User> {
		const userEntity: User = {
			...userDto,
			role: UserRole.EMPLOYEE,
			activated: true,
			createDate: new Date().toDateString(),
			partitionKey: organisation,
			_id: uniqueId()
		};

		return this.Insert(organisation, userEntity);
	}
}
