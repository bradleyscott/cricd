/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '/node_modules/',
    '/__test__/',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  testTimeout: 10000,
};
