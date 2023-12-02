import { dateParser } from '../core/dateParser';

describe('dateParser', () => {
	it('should return "21/1/2000" for a dat Date(2000, 1, 21)', () => {
		expect(dateParser(new Date(2000, 0, 21), 'dd/MM/YYYY')).toBe('21/1/2000');
	});
});
