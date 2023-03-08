import mongoose from 'mongoose';
import { configuration } from '../common/configuration';

const { DATABASE_URL } = configuration;

type ODM = typeof mongoose;

async function connectDatabase(): Promise<ODM> {
  const ODM = await mongoose.connect(DATABASE_URL);

  return ODM;
}

async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}

function getODM(): ODM {
  return mongoose;
}

export { connectDatabase, disconnectDatabase, getODM };
