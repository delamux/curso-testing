import { User, UserRepository, UserFinder } from '../core/userFinder';

class RepositoryStub implements UserRepository {
	constructor(private stubListOfUsersByName: User[]) {}

	findUsersByName(name: string): User[] {
		return this.stubListOfUsersByName;
	}

	findUsersBySurname(surname: string): User[] {
		return this.stubListOfUsersByName;
	}
}

describe('The User Finder', () => {
	it('searches user by name first', () => {
		const aName = 'irrelevant-name';
		const aUser = new User(aName, '');
		const repository = new RepositoryStub([aUser]);
		const usersFinder = new UserFinder(repository);

		const result = usersFinder.findUsers(aName);

		expect(result.length).toEqual(1);
		expect(result[0]).toEqual(aUser);
	});

	it('searches user by surname when nothing is found by name', () => {
		const aSurname = 'irrelevant-name';
		const aUser = new User('', aSurname);
		const repository = new RepositoryStub([aUser]);
		const usersFinder = new UserFinder(repository);

		const result = usersFinder.findUsers(aSurname);

		expect(result.length).toEqual(1);
		expect(result[0]).toEqual(aUser);
	});
});

describe('The User Finder Monkey Patching', () => {
	it('searches user by name first', () => {
		const aName = 'irrelevant-name';
		const aUser = new User(aName, '');
		// Monkey Patching
		const repository = {
			findUsersByName: (name: string) => [aUser],
			findUsersBySurname: (surname: string) => [],
		};
		const usersFinder = new UserFinder(repository);

		const result = usersFinder.findUsers(aName);

		expect(result.length).toEqual(1);
		expect(result[0]).toEqual(aUser);
	});

	it('searches user by surname when nothing is found by name', () => {
		const aSurname = 'irrelevant-name';
		const aUser = new User('', aSurname);

		//monkey patching
		const repository = {
			findUsersByName: (name: string) => [],
			findUsersBySurname: (surname: string) => [aUser],
		};
		const usersFinder = new UserFinder(repository);

		const result = usersFinder.findUsers(aSurname);

		expect(result.length).toEqual(1);
		expect(result[0]).toEqual(aUser);
	});
});

class Repository implements UserRepository {
	findUsersByName(name: string): User[] {
		return [];
	}

	findUsersBySurname(surname: string): User[] {
		return [];
	}
}

describe('The User Finder Real Object instance', () => {
	it('searches user by name first', () => {
		const aName = 'irrelevant-name';
		const aUser = new User(aName, '');
		const repository = new Repository();
		repository.findUsersByName = () => [aUser];
		const usersFinder = new UserFinder(repository);

		const result = usersFinder.findUsers(aName);

		expect(result.length).toEqual(1);
		expect(result[0]).toEqual(aUser);
	});

	it('searches user by surname when nothing is found by name', () => {
		const aSurname = 'irrelevant-name';
		const aUser = new User('', aSurname);
		const repository = new Repository();
		repository.findUsersBySurname = () => [aUser];
		const usersFinder = new UserFinder(repository);

		const result = usersFinder.findUsers(aSurname);

		expect(result.length).toEqual(1);
		expect(result[0]).toEqual(aUser);
	});
});
