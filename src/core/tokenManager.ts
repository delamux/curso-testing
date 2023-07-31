import * as jwt from 'jsonwebtoken';

export class TokenManager {
	constructor(private readonly secretKey: string, private readonly expirationInSeconds: number) {}

	public generateToken(payload: object): string {
		return jwt.sign(payload, this.secretKey, {
			expiresIn: this.expirationInSeconds,
		});
	}

	public verifyToken(token: string): object {
		return jwt.verify(token, this.secretKey);
	}
}
