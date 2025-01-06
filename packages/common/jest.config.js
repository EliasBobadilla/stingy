/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  collectCoverageFrom: ["<rootDir>/**/*.{ts,tsx}"],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["json", "html"],
  preset: "ts-jest",
  rootDir: "./",
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/*.(spec|test).{ts,tsx}"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
