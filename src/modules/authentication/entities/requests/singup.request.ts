import {Request} from 'express';
import {UserDTO} from '../user.entity';

export interface SignupRequest extends Request {
	params: {
		organisation: string;
	},
	body: UserDTO
}
