import test from 'ava';
import { TestBootsrap, TestContext } from '../fixtures/bootstrap';

const { organisation } = new TestBootsrap(test, 'get', '/:organisation/cars');

test('Get all cars for organisation', async (t: TestContext) => {
	const response = await t.context.run({ params: { organisation } });

	t.is(response.cars.length, 14);
});
