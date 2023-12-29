import { UserService, User, UserRepository } from '../core/userService';

class RepositorySpy implements UserRepository {
	public savedUser: User;

	save(user: User): void {
		this.savedUser = user;
	}
}

describe('The User Service', () => {
	it('saves user throughout the repository', () => {
		const repository = new RepositorySpy();
		const service = new UserService(repository);
		const user = new User('irrelevant-name', 'irrelevant-surname');

		service.updatePassword(user, '123');

		expect(repository.savedUser).toEqual(user);
	});
});
