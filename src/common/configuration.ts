import dotenv from 'dotenv';
import { cleanEnv, makeValidator, port, str } from 'envalid';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../.env') });

const configuration = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  DATABASE_URL: makeValidator((value) => {
    const protocol = 'mongodb://';

    if (value.startsWith(protocol)) {
      return value;
    }

    throw new Error(`Must start with \`${protocol}\``);
  })(),
  SERVER_PORT: port(),
  SECRET: str(),
});

export { configuration };
