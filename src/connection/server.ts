import type { FastifyInstance } from 'fastify';
import fastify from 'fastify';
import { configuration } from '../common/configuration';

const { isDevelopment } = configuration;

let server: FastifyInstance | null = null;

function createServer(): FastifyInstance {
  if (server === null) {
    server = fastify({ logger: isDevelopment });
  }

  return server;
}

function getServer(): FastifyInstance {
  return createServer();
}

export { createServer, getServer };
