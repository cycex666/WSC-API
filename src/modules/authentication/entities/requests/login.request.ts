import {Request} from 'express';

export interface LoginRequest extends Request {
	body: {
		organisation: string;
		login: string;
		password: string;
	};
}
