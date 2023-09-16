/**
 *
 * - For the number 1, the result should be "1."
 * - For the number 3, the result should be "fizz."
 * - For the number 5, the result should be "buzz."
 * - For the number 15, the result should be "fizzbuzz."
 * - For any number divisible by 3, the result should be "fizz."
 * - For any number divisible by 5, the result should be "buzz."
 * - For any number divisible by 15, the result should be "fizzbuzz."
 * - For all other numbers, the result should be the number itself.
 */
export const fizzbuzz = (num: number): string => {
	const isDivisibleBy = (divisor: number) => num % divisor === 0;

	if (isDivisibleBy(15)) {
		return 'fizzbuzz';
	}
	if (isDivisibleBy(3)) {
		return 'fizz';
	}
	if (isDivisibleBy(5)) {
		return 'buzz';
	}

	return num.toString();
};
