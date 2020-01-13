import { TestInterface, ExecutionContext } from 'ava';
import supertest from 'supertest';
import { app } from '../../src/server';
import uuid from 'uuid';
import { authorize } from '../../src/core/authorize';

const { API_VERSION } = process.env;
let testRouter;

export interface MockRequest {
	body?: any;
	params?: any;
	query?: any;
}

export type TestContext<
	ResultType = unknown,
	RequestType = MockRequest
> = ExecutionContext<{
	run(request?: RequestType): any;
}>;

export class TestBootsrap {
	private testRouter$: any;
	private httpMethod$: string;
	private url$: string;
	private authotize$: boolean;
	readonly organisation: string;

	constructor(
		test: TestInterface,
		httpMethod: string,
		url: string,
		useExpressServer: boolean = true,
		authorize: boolean = true
	) {
		this.httpMethod$ = httpMethod;
		this.url$ = url;

		if (!testRouter) {
			testRouter = supertest(app.router);
		}

		this.testRouter$ = testRouter;
		this.authotize$ = authorize;

		if (useExpressServer) {
			test.beforeEach((t: TestContext) => this.beforeEach(t));
			test.after((t: TestContext) => this.afterEach(t));
		}
		this.organisation = `test-organisation-${uuid()}`;
	}

	beforeEach(testContext: TestContext): void {
		testContext.context = {
			run: async (args?: MockRequest): Promise<any> => {
				return this.executeTest(args);
			}
		};
	}

	afterEach(testContext: TestContext): void {
		console.log('test');
		// const { server } = app;
		// server.close();
		// process.exit();
	}

	async executeTest(args?: MockRequest): Promise<any> {
		let url = this.prepareUrl(args);

		try {
			let response = await this.testRouter$[this.httpMethod$](
				`/api/${API_VERSION}${url}`
			)
				.set(
					this.authotize$ ? 'authorization' : '',
					this.authotize$ ? 'avatestoauthtoken' : authorize
				)
				.query({
					...args?.query
				})
				.send(args?.body);

			const { serverError, statusCode, text, clientError, body } = response;

			if (serverError || clientError) {
				return `${statusCode} - ${text}`;
			}

			return body;
		} catch (err) {
			console.log(err);
			const { text } = err;

			return text;
		}
	}

	private prepareUrl(args?: MockRequest): string {
		let url = this.url$;

		if (args) {
			const { params } = args;

			if (params) {
				const urlParams = this.url$.split('/').filter(x => x.startsWith(':'));

				for (const urlParam of urlParams) {
					url = url.replace(
						`/${urlParam}`,
						`/${params[urlParam.replace(':', '')]}`
					);
				}
				console.log(`called url: `, url);
			}
		}

		return url;
	}
}
