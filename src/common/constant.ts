import { StatusCodes as HTTPStatusCode } from 'http-status-codes';

const MongoDBStatusCode = {
  DUPLICATE_KEY: 11000,
} as const;

export { HTTPStatusCode, MongoDBStatusCode };
