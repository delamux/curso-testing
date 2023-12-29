import { UserService, User, UserRepository } from '../core/userService';

class RepositoryMock implements UserRepository {
	public savedUser: User;
	public calledTimes = 0;

	save(user: User): void {
		this.savedUser = user;
		this.calledTimes++;
	}

	public verify() {
		if (this.calledTimes > 1) {
			throw new Error('Saved method was called more than once');
		}
	}
}

describe('The User Service for mock', () => {
	it('saves user throughout the repository', () => {
		const repository = new RepositoryMock();
		const service = new UserService(repository);
		const user = new User('irrelevant-name', 'irrelevant-surname');

		service.updatePassword(user, '123');

		repository.verify();
	});
});
