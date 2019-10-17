import {Document} from 'mongoose';
import {EntityBase} from '../../../core/db';

export interface User extends EntityBase {

}

export interface UserEntity extends User, Document {

}
