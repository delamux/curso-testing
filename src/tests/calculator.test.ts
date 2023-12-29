import * as arithmetic from '../core/arithmetic';
import * as calculator from '../core/calculator';

describe('The calculator', () => {
	it('calls arithmetic add', () => {
		const mockAdd = jest.spyOn(arithmetic, 'add');
		expect(calculator.doAdd(1, 2)).toBe(3);
		expect(mockAdd).toHaveBeenCalledWith(1, 2);
	});

	it('calls arithmetic add mock implementation', () => {
		const mockAdd = jest.spyOn(arithmetic, 'add');
		mockAdd.mockImplementation(() => 10);
		// as you can see here with the params 1, 2 the result is 10, is because the mock implementation
		expect(calculator.doAdd(1, 2)).toBe(10);
		expect(mockAdd).toHaveBeenCalledWith(1, 2);
	});

	it('calls arithmetic subtract', () => {
		const mockSubtract = jest.spyOn(arithmetic, 'subtract');
		expect(calculator.doSubtract(1, 2)).toBe(-1);
		expect(mockSubtract).toHaveBeenCalledWith(1, 2);
	});
});

// using jst mock in this case mocking the modules can not work the result, is undefined
// jest.mock('../core/arithmetic');
//
// // adding the method to check the result
// describe('The calculator', () => {
// 	// (arithmetic as arithmetic.Arithmetic).add = jest.fn(arithmetic.add);
// 	// (arithmetic as arithmetic.Arithmetic).subtract = jest.fn(arithmetic.subtract);
//
// 	test('calls arithmetic.add', () => {
// 		const result = calculator.doAdd(1, 2);
// 		expect(arithmetic.add).toHaveBeenCalledWith(1, 2);
// 		expect(arithmetic.add).toBeCalledTimes(1);
// 		// expect(result).toBe(3);
// 	});
//
// 	test('calls arithmetic.subtract', () => {
// 		const result = calculator.doSubtract(1, 2);
// 		expect(arithmetic.subtract).toHaveBeenCalledWith(1, 2);
// 		// expect(result).toBe(-1);
// 	});
// });
