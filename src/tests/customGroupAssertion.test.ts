test('customGroupAssertion', () => {
	const list = [10, 20, 30];
	expectThatList(list).isExactly(10, 20, 30);
});

test('customGroupAssertion object', () => {
	const list = [{ value: 10 }, { value: 20 }, { value: 30 }];
	expectThatList(list).isExactly({ value: 10 }, { value: 20 }, { value: 30 });
});

function expectThatList<T>(list: T[]) {
	return listMatchers(list);
}

function listMatchers<T>(list: T[]) {
	return {
		isExactly: (...expected: T[]) => {
			expect(list.length).toBe(expected.length);
			list.forEach((_, i) => {
				// expect(list[i]).toBe(expected[i]);
				//instead use toBe use Equal to compare objects
				expect(list[i]).toEqual(expected[i]);
			});
		},
	};
}
