import * as arithmetic from '../core/arithmetic';
import * as calculator from '../core/calculator';

// using jst mock in this case mocking the modules can not work the result, is undefined
// jest.mock('../core/arithmetic');

// adding the method to check the result
describe('The calculator', () => {
	(arithmetic as arithmetic.Arithmetic).add = jest.fn(arithmetic.add);
	(arithmetic as arithmetic.Arithmetic).subtract = jest.fn(arithmetic.subtract);

	test('calls arithmetic.add', () => {
		const result = calculator.doAdd(1, 2);
		expect(arithmetic.add).toHaveBeenCalledWith(1, 2);
		expect(arithmetic.add).toBeCalledTimes(1);
		expect(result).toBe(3);
	});

	test('calls arithmetic.subtract', () => {
		const result = calculator.doSubtract(1, 2);
		expect(arithmetic.subtract).toHaveBeenCalledWith(1, 2);
		expect(result).toBe(-1);
	});
});
