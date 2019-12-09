import {Request} from 'express';

export interface LoginRequest extends Request {
	body: {
		login: string;
		password: string;
	};
}
