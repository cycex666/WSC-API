import {Document, Schema} from 'mongoose';
import {EntityBase, BaseSchema} from '../../../core/db';
import {UserRole} from '../enums/user-role.enum';

export interface UserDTO {
	firstName: string;
	name: string;
	email: string;
	password: string;
}

export interface User extends UserDTO, EntityBase {
	activated: boolean;
	role: UserRole;
	createDate: string;
	updateDate?: string;
}

export const UserSchema = new Schema({
	...BaseSchema.obj
});

export interface UserEntity extends User, Document {}
