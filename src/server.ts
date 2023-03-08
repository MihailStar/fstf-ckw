import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import type { FastifyInstance } from 'fastify';
import { configuration } from './common/configuration';
import { createServer } from './connection/server';
import { itemRoute } from './resource/item/item.route';
import { itemTagName } from './resource/item/item.schema';
import { userRoute } from './resource/user/user.route';
import { userTagName } from './resource/user/user.schema';

const { SECRET } = configuration;

function startServer(): FastifyInstance {
  const server = createServer()
    .register(fastifyHelmet)
    .register(fastifyCors)
    .register(fastifySwagger, {
      exposeRoute: true,
      routePrefix: '/docs',
      swagger: {
        info: { title: 'fstf-ckw', version: '0.1.0' },
        tags: [
          { name: userTagName, description: 'User' },
          { name: itemTagName, description: 'Item' },
        ],
      },
    })
    .register(fastifyJwt, {
      secret: SECRET,
    })
    .register(userRoute)
    .register(itemRoute);

  return server;
}

export { startServer };
