/**
 * We need a method where we will pass 2 arguments:
 *  FIRST argument: is a Date instance
 *  Second argument: is the format we want to return from the date instance
 *  conditions:
 *  should return an exception if the format is not valid
 *     - valid formats: dd/MM/YYYY - MM.dd.YYYY - dd-MM-YYYY (Typescript it will help)
 *  should return the date in the correct format
 */

type dateFormat = 'dd/MM/YYYY' | 'MM.dd.YYY' | 'dd-MM-YYYY';

const getDayMonthYear = (date: Date): { day: number; month: number; year: number } => {
	return {
		day: date.getDate(),
		month: date.getMonth() + 1,
		year: date.getFullYear(),
	};
};

const SEPARATORS: string[] = ['/', '.', '-'];

export const dateParser = (date: Date, format: dateFormat): string => {
	const { day, month, year } = getDayMonthYear(date);

	const indexSeparator: string[] = SEPARATORS.filter((separator): boolean =>
		format.includes(separator)
	);
	console.log('INDEX', indexSeparator);
	if (!indexSeparator.every((value) => value === '/')) {
		throw new Error('The format is not valid');
	}

	// const separator: string = SEPARATORS[indexSeparator[0]];
	// if (separator === '.') {
	// 	return `${month}.${day}.${year}`;
	// }
	return `${month}.${day}.${year}`;
	//return `${day}${separator}${month}${separator}${year}`;
};
