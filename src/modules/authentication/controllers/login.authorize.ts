import ow from "ow";
import {
	HTTP400Error,
	HTTP401Error,
	HTTPClientError
} from "../../../core/errors";
import { Response } from "express";
import { Request } from "../entities";
import { AuthenticationModel } from "../model";

/**
 * @api {post} /oauth/login/
 * @apiVersion 0.0.1
 * @apiName Login user
 * @apiDescription Request user login
 * @apiGroup Authentication
 *
 * @apiParam	(body)	{String}	login		Login
 * @apiParam	(body)	{String}	password	Password
 *
 * @apiSuccess	{Boolean}	auth	Flag defined user is authenticated
 * @apiSuccess	{String}	token  	OAuth token access
 *
 * @apiExample
 * {
 * 		login: 'testLogin'
 * 		password: 'testPassword'
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "auth": true,
 *       "token": "somesupersecrettoken"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 */
export const exec = async (
	req: Request.LoginRequest,
	res: Response
): Promise<void> => {
	try {
		const { login, password } = req.body;
		const model = new AuthenticationModel();
		const tokenResponse = await model.tryLogin(login, password);

		res.status(200).json(tokenResponse);
	} catch (err) {
		if (err instanceof HTTP401Error) {
			throw err;
		}

		throw new HTTP400Error(err.message);
	}
};

export const validate = async (
	req: Request.LoginRequest,
	res: Response
): Promise<void> => {
	const { body } = req;

	try {
		ow(
			body,
			"body",
			ow.object.nonEmpty.exactShape({
				organisation: ow.string.nonEmpty,
				login: ow.string.nonEmpty,
				password: ow.string.nonEmpty
			})
		);
	} catch (err) {
		throw new HTTP400Error(err.message);
	}
};
