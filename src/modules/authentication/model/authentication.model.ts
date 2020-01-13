import * as jwtToken from 'jsonwebtoken';
import { HTTP401Error } from '../../../core/errors';
import { config } from '../../../middleware/config.provider';
import { UserDTO, User } from '../entities';
import { any } from 'bluebird';

export class AuthenticationModel {
	async tryLogin(
		user: string,
		password: string
	): Promise<{ auth: boolean; token: string; user: string }> {
		if (user === 'admin' && password === 'admin123!') {
			const { Secret, ExpirationTime } = config.OAuth;
			return {
				auth: true,
				token: jwtToken.sign({ user }, Secret, { expiresIn: ExpirationTime }),
				user
			};
		}
		throw new HTTP401Error();
	}
}
