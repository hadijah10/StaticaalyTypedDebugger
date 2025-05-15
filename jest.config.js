module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleFileExtensions: ["ts", "js", "json", "node"],
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	setupFilesAfterEnv: ["<rootDir>/node_modules/@testing-library/jest-dom"],
};