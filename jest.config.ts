// eslint-disable-next-line node/no-extraneous-import
import type { Config } from '@jest/types';

const configuration: Config.InitialOptions = {
  coverageReporters: ['text'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
};

export default configuration;
