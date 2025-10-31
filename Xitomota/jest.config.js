export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',  
    '^@/(.*)$': '<rootDir>/src/$1'                             
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'  
}}
;
