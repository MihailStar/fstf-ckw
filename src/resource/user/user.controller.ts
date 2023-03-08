import type { RouteHandler } from 'fastify';
import { mongo } from 'mongoose';
import { HTTPStatusCode } from '../../common/constant';
import { getServer } from '../../connection/server';
import type { ReturnData } from '../../helper/return-data';
import { dataKey, returnData } from '../../helper/return-data';
import { userService } from './user.service';
import type {
  CreateRouteGeneric,
  InfoRouteGeneric,
  LoginRouteGeneric,
  UserPayload,
  UserToken,
} from './user.type';

const userController: {
  create: RouteHandler<CreateRouteGeneric>;
  login: RouteHandler<LoginRouteGeneric>;
  /** @todo Replace default JWT error handler */
  info: RouteHandler<InfoRouteGeneric>;
} = {
  // Create
  async create(request, reply): Promise<ReturnData<UserToken | null>> {
    const { body: dto } = request;
    const { [dataKey]: createdUser } = await userService.create(dto);

    /*
    if (createdUser instanceof mongo.MongoServerError) {
      void reply.code(HTTPStatusCode.UNPROCESSABLE_ENTITY);
      throw new Error('User exists');
    }
    */

    if (createdUser instanceof mongo.MongoServerError) {
      void reply.code(HTTPStatusCode.UNPROCESSABLE_ENTITY);
      return returnData(null);
    }

    const payload: UserPayload = {
      id: createdUser.id,
      login: createdUser.login,
    };
    const token: UserToken = getServer().jwt.sign(payload);

    void reply.code(HTTPStatusCode.CREATED);
    return returnData(token);
  },

  // Login
  async login(request, reply): Promise<ReturnData<UserToken | null>> {
    const { body: dto } = request;
    const { [dataKey]: readedUser } = await userService.login(dto);

    if (readedUser === null) {
      void reply.code(HTTPStatusCode.NOT_FOUND);
      return returnData(null);
    }

    const payload: UserPayload = {
      id: readedUser.id,
      login: readedUser.login,
    };
    const token: UserToken = getServer().jwt.sign(payload);

    return returnData(token);
  },

  // Info
  async info(request): Promise<ReturnData<UserPayload>> {
    const payload: UserPayload = await request.jwtVerify();

    return returnData(payload);
  },
};

export { userController };
