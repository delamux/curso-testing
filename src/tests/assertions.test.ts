describe('assertions', () => {
	it('toBe', () => {
		expect(1 + 2).toBe(3);
		expect(1 + 2).not.toBe(4);
	});

	it('toEqual', () => {
		// Objetos

		//expect({ foo: 'foo', bar: 'bar' }).toBe({ foo: 'foo', bar: 'bar' }); //false
		expect({ foo: 'foo', bar: 'bar' }).toEqual({ foo: 'foo', bar: 'bar' });
		expect({ foo: 'foo', bar: 'bar' }).not.toEqual({ foo: 'foo', bar: 'FOO' });

		// Arrays

		//expect([1, 2, 3]).toBe([1, 2, 3]); //false
		expect([1, 2, 3]).toEqual([1, 2, 3]);
		expect([1, 2, 3]).not.toEqual([0, 1, 2]);
	});

	it('Falsy', () => {
		expect(false).toBeFalsy();
		expect('').toBeFalsy();
		expect(0).toBeFalsy();
		expect(undefined).toBeFalsy();
		expect(null).toBeFalsy();
		expect(NaN).toBeFalsy();
		expect({}).toBeDefined();
		expect(0).toBeFalsy();
		expect(-0).toBeFalsy();
		// @ts-ignore
		expect(0n).toBeFalsy();
		expect('').toBeFalsy();
	});

	it('Greater than', () => {
		expect(1).toBeGreaterThan(0);
		expect(1).toBeGreaterThanOrEqual(0);
		expect(0).toBeLessThan(1);
		expect(0).toBeLessThanOrEqual(1);
	});

	it('Match', () => {
		expect('foo').toMatch('foo');
		expect('foo').not.toMatch('bar');
		expect('Luis del Amo').toMatch(/del Amo/);
	});

	it('Contain', () => {
		expect([0, 1, 2]).toContain(2);
		expect([
			{ foo: 'foo', bar: 'bar' },
			{ foo: 'foo', bar: 'foo' },
		]).toContainEqual({ foo: 'foo', bar: 'foo' });
	});

	it('Exceptions', () => {
		// The thrower function must be passed as a function, not called
		const thrower = () => {
			throw new Error('foo');
		};

		expect(thrower).toThrow();
		expect(thrower).toThrow('foo');
		expect(thrower).toThrowError('foo');
		expect(thrower).toThrowError(/foo/);
	});
});
