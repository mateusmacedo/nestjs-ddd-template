module.exports = {
  rootDir: '.',
  moduleNameMapper: {
    '@/test/(.*)': '<rootDir>/test/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  testResultsProcessor: 'jest-sonar-reporter',
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: 100
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/infrastructure/migrations/**',
    '!<rootDir>/src/main.{js,jsx,ts,tsx}',
    '!<rootDir>/src/module.alias.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.*spec.{js,jsx,ts,tsx}'
  ],
  clearMocks: true
}
