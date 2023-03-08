import { HTTPStatusCode } from '../../common/constant';
import { dataKey, returnData } from '../../helper/return-data';

const userTagName = 'user'; // for Swagger

const user = {
  additionalProperties: false,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      pattern: '^[0-9A-Fa-f]{24}$',
    },
    login: {
      type: 'string',
      minLength: 3,
    },
    password: {
      type: 'string',
      minLength: 3,
    },
  },
  required: ['id', 'login', 'password'],
} as const;

const token = {
  type: 'string',
} as const;

// Create
const createUserDTO = {
  additionalProperties: false,
  type: 'object',
  properties: {
    login: user.properties.login,
    password: user.properties.password,
  },
  required: ['login', 'password'],
} as const;

const createUserSchema = {
  schema: {
    summary: 'Register',
    body: createUserDTO,
    response: {
      [HTTPStatusCode.CREATED]: {
        type: 'object',
        properties: returnData(token),
        required: [dataKey],
      },
      [HTTPStatusCode.UNPROCESSABLE_ENTITY]: {
        type: 'object',
        properties: returnData({ type: 'null' } as const),
        required: [dataKey],
      },
    },
    tags: [userTagName] as string[],
  },
} as const;

// Login
const loginUserDTO = {
  additionalProperties: false,
  type: 'object',
  properties: {
    login: user.properties.login,
    password: user.properties.password,
  },
  required: ['login', 'password'],
} as const;

const loginUserSchema = {
  schema: {
    summary: 'Login',
    body: createUserDTO,
    response: {
      [HTTPStatusCode.OK]: {
        type: 'object',
        properties: returnData(token),
        required: [dataKey],
      },
      [HTTPStatusCode.NOT_FOUND]: {
        type: 'object',
        properties: returnData({ type: 'null' } as const),
        required: [dataKey],
      },
    },
    tags: [userTagName] as string[],
  },
} as const;

// Info
const payload = {
  additionalProperties: false,
  type: 'object',
  properties: {
    id: user.properties.id,
    login: user.properties.login,
  },
  required: ['id', 'login'],
} as const;

const infoUserSchema = {
  schema: {
    summary: 'Info',
    headers: {
      type: 'object',
      properties: {
        Authorization: { description: 'Bearer token', type: 'string' },
      },
      required: ['Authorization'],
    },
    response: {
      [HTTPStatusCode.OK]: {
        type: 'object',
        properties: returnData(payload),
        required: [dataKey],
      },
    },
  },
} as const;

export {
  userTagName,
  user,
  token,
  createUserDTO,
  createUserSchema,
  loginUserDTO,
  loginUserSchema,
  payload,
  infoUserSchema,
};
