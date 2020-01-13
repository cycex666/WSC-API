import test from 'ava';
import * as sinon from 'sinon';
import { TestBootsrap, TestContext } from '../fixtures/bootstrap';

const { organisation } = new TestBootsrap(test, 'post', '/oauth/login', true);

test('Authorize fail', async (t: TestContext) => {
	console.log('dupa');

	t.deepEqual(
		await t.context.run({}),
		'400 - Expected object `body` to not be empty'
	);
	t.deepEqual(
		await t.context.run({ body: { login: '', password: '' } }),
		'400 - Expected property string `login` to not be empty in object `body`'
	);
	t.deepEqual(
		await t.context.run({ body: { login: 'testLogin', password: '' } }),
		'400 - Expected property string `password` to not be empty in object `body`'
	);
});

test.serial('Authoriza and get auth token', async (t: TestContext) => {
	const clock = sinon.useFakeTimers(new Date('2020-01-13T09:00:00.000Z'));

	const response = await t.context.run({
		body: { login: 'admin', password: 'admin123!' }
	});

	clock.restore();

	t.deepEqual(response, {
		auth: true,
		user: 'admin',
		token:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE1Nzg5MDYwMDAsImV4cCI6MTU3ODk5MjQwMH0.GwB___tdgjG86oSm5CprMumNjrZHYZF8MdSN-U0BAEU'
	});
});
