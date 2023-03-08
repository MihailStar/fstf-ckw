import type { FastifyInstance } from 'fastify';
import { userController } from './user.controller';
import {
  createUserSchema,
  infoUserSchema,
  loginUserSchema,
} from './user.schema';

async function userRoute(instance: FastifyInstance): Promise<void> {
  // Create
  instance.post('/user/register', createUserSchema, userController.create);

  // Login
  instance.post('/user/login', loginUserSchema, userController.login);

  // Info
  instance.get('/user/info', infoUserSchema, userController.info);
}

export { userRoute };
