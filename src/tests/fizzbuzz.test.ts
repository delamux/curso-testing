import { fizzbuzz } from '../core/fizzbuzz';

describe('fizzbuzz', () => {
	it('should return "1" for 1', () => {
		expect(fizzbuzz(1)).toBe('1');
	});

	it('should return "fizz" for 3', () => {
		expect(fizzbuzz(3)).toBe('fizz');
	});

	it('should return "buzz" for 5', () => {
		expect(fizzbuzz(5)).toBe('buzz');
	});

	it('should return "fizzbuzz" for 15', () => {
		expect(fizzbuzz(15)).toBe('fizzbuzz');
	});

	it('should return "fizz" for 6', () => {
		expect(fizzbuzz(6)).toBe('fizz');
	});

	it('should return "buzz" for 10', () => {
		expect(fizzbuzz(10)).toBe('buzz');
	});

	it('should return "fizzbuzz" for 30', () => {
		expect(fizzbuzz(30)).toBe('fizzbuzz');
	});

	it('should return "2" for 2', () => {
		expect(fizzbuzz(2)).toBe('2');
	});
});
