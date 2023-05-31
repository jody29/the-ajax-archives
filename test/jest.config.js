const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  roots: ['<rootDir>/src/'],
  collectCoverageFrom: ['(src)/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  setupFilesAfterEnv: ['<rootDir>/test/config/setupEnv.js'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
    '^.+\\.css$': '<rootDir>/test/config/cssTransform.js',
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@public/(.*)$': '<rootDir>/public/$1',
    '@test/(.*)$': '<rootDir>/test/$1',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
};
