module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true, // con esta opción vemos los resultados individual de los test
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
