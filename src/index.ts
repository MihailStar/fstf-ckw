import { configuration } from './common/configuration';
import { connectDatabase } from './connection/database';
import { print } from './helper/print';
import { throwError } from './helper/throw-error';
import { startServer } from './server';

const { SERVER_PORT } = configuration;

async function startApp(): Promise<void> {
  const server = startServer();

  try {
    await connectDatabase();
    await server.listen({ port: SERVER_PORT });

    print(`✓ http://localhost:${SERVER_PORT}`);
  } catch (reason) {
    server.log.error(reason);

    throwError(reason);
  }
}

void startApp();
