export default {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  transform: {},
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  moduleFileExtensions: ["js", "json"],
  verbose: true
};
