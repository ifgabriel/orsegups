import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: ['**/?(*.)spec.ts']
};

export default config;
