module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	// With verbose option we can see the individual test results
	verbose: true,
	collectCoverage: true,
	coverageDirectory: './coverage',
	coverageThreshold: {
		global: {
			statements: 100,
			branches: 100,
			functions: 100,
			lines: 100,
		},
	},
};
