import { anything, check, dictionary, property, string } from 'fast-check';

import { TokenManager } from '../core/tokenManager';

describe('The token manager', () => {
	const tokenManager = new TokenManager('mySuperSecretKey', 3600);

	test('a generated token contains the original payload when decoded', () => {
		check(
			property(dictionary(string(), anything()), (payload) => {
				const token = tokenManager.generateToken(payload);
				const decodedPayload = tokenManager.verifyToken(token);
				expect(decodedPayload).toEqual(payload);
			})
		);
	});

	test(' a token decoded with an invalid key results in an error', () => {
		const tokenWithInvalidSecret: TokenManager = new TokenManager('invalidSecret', 3600);
		check(
			property(dictionary(string(), anything()), (payload) => {
				const token = tokenManager.generateToken(payload);
				expect(() => tokenWithInvalidSecret.verifyToken(token)).toThrow();
			})
		);
	});

	test('a manipulated token results in an error when decoded', () => {
		check(
			property(dictionary(string(), anything()), string(), (payload, extraData) => {
				const token = tokenManager.generateToken(payload);
				const manipulatedToken = `${token}${extraData}`;
				expect(() => tokenManager.verifyToken(manipulatedToken)).toThrow();
			})
		);
	});
});
