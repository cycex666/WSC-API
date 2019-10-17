import * as jwtToken from 'jsonwebtoken';
import {HTTP401Error} from '../../../core/errors';
import {config} from '../../../middleware/config.provider';

export class AuthenticationModel {
	async tryLogin(user: string, password: string): Promise<any> {
		if (user === 'admin' && password === 'admin123!') {
			const {Secret, ExpirationTime} = config.OAuth;
			return {
				auth: true,
				token: jwtToken.sign({user}, Secret, {expiresIn: ExpirationTime})
			}
		}
		throw new HTTP401Error();
	}
}
