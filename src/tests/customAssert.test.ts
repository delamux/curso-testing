// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace jest {
	interface Matchers<R> {
		customToBe(value): CustomMatcherResult;
		isExactly<T>(...values: T[]): CustomMatcherResult;
	}
}

expect.extend({
	customToBe(expected, received) {
		return {
			pass: expected === received,
			message: () => `Expected: ${expected} \nReceived: ${received}`,
		};
	},
	isExactly<T>(expectedList: T[], ...values: T[]) {
		const haveSameLength = expectedList.length === values.length;
		const areObjects = typeof expectedList === 'object' && typeof values === 'object';
		const haveTheSameElements = () => {
			if (areObjects) {
				// this was just a proof of concept, but it's not a good idea to compare objects like this
				return JSON.stringify(values) === JSON.stringify(expectedList);
			}
			return values.every((_, i) => values[i] === expectedList[i]);
		};
		return {
			pass: haveSameLength && haveTheSameElements(),
			message: () =>
				areObjects
					? `Expected: ${JSON.stringify(expectedList)} \nReceived: ${JSON.stringify(values)}`
					: `Expected: ${expectedList} \nReceived: ${values}`,
		};
	},
});

test('customToBe', () => {
	const list = [10, 20, 30];
	const list2 = [{ value: 10 }, { value: 20 }, { value: 30 }];
	expect(list.length).customToBe(3);
	expect(list).isExactly(10, 20, 30);
	expect(list2).isExactly({ value: 10 }, { value: 20 }, { value: 30 });
});
