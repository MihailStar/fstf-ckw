import type { FromSchema } from 'json-schema-to-ts';
import type { HTTPStatusCode } from '../../common/constant';
import type {
  createUserDTO,
  createUserSchema,
  infoUserSchema,
  loginUserDTO,
  loginUserSchema,
  payload,
  token,
  user,
} from './user.schema';

type User = FromSchema<typeof user>;
type BaseUser = Omit<User, 'id'>;

type UserToken = FromSchema<typeof token>;
type UserPayload = FromSchema<typeof payload>;

// Create
type CreateUserDTO = FromSchema<typeof createUserDTO>;
type CreateRouteBody = FromSchema<typeof createUserSchema['schema']['body']>;
type CreateRouteReply = FromSchema<
  | typeof createUserSchema['schema']['response'][HTTPStatusCode.CREATED]
  | typeof createUserSchema['schema']['response'][HTTPStatusCode.UNPROCESSABLE_ENTITY]
>;
type CreateRouteGeneric = {
  Body: CreateRouteBody;
  Reply: CreateRouteReply;
};

// Login
type LoginUserDTO = FromSchema<typeof loginUserDTO>;
type LoginRouteBody = FromSchema<typeof loginUserSchema['schema']['body']>;
type LoginRouteReply = FromSchema<
  | typeof loginUserSchema['schema']['response'][HTTPStatusCode.OK]
  | typeof loginUserSchema['schema']['response'][HTTPStatusCode.NOT_FOUND]
>;
type LoginRouteGeneric = {
  Body: LoginRouteBody;
  Reply: LoginRouteReply;
};

// Info
type InfoRouteHeaders = FromSchema<typeof infoUserSchema['schema']['headers']>;
type InfoRouteReply = FromSchema<
  typeof infoUserSchema['schema']['response'][HTTPStatusCode.OK]
>;
type InfoRouteGeneric = {
  Body: InfoRouteHeaders;
  Reply: InfoRouteReply;
};

export {
  User,
  BaseUser,
  UserToken,
  UserPayload,
  CreateUserDTO,
  CreateRouteGeneric,
  LoginUserDTO,
  LoginRouteGeneric,
  InfoRouteGeneric,
};
