import { camelCaseConverter } from '../core/camelCaseConverter';

describe('camelCaseConverter', () => {
	it('should return "" for ""', () => {
		expect(camelCaseConverter('')).toBe('');
	});

	it('should return "Foo" for "Foo"', () => {
		expect(camelCaseConverter('Foo')).toBe('Foo');
	});

	it('should return "FooBar" for "Foo Bar"', () => {
		expect(camelCaseConverter('Foo Bar')).toBe('FooBar');
	});

	it('should return "FooBarFoo" for "Foo_Bar-Foo"', () => {
		expect(camelCaseConverter('Foo_Bar-Foo')).toBe('FooBarFoo');
	});

	it('should return "Foo" for "foo"', () => {
		expect(camelCaseConverter('foo')).toBe('Foo');
	});

	it('should return "FooBarFooBar" for "foo_bar foo-bar"', () => {
		expect(camelCaseConverter('foo_bar foo-bar')).toBe('FooBarFooBar');
	});

	it('should return "FooBarFooBarFooBar" for "foo_bar foo-bar foo__Bar"', () => {
		expect(camelCaseConverter('foo_bar foo-bar foo__Bar')).toBe('FooBarFooBarFooBar');
	});

	it('should return "FooBarFooBarFooBar" for "foo_bar foo-bar foo__BAR"', () => {
		expect(camelCaseConverter('foo_bar foo-bar foo__BAR')).toBe('FooBarFooBarFooBar');
	});

	it('should return "FooBarFoo" for "foo      bar - foo"', () => {
		expect(camelCaseConverter('foo      bar - foo')).toBe('FooBarFoo');
	});
});
