import type { FastifyInstance } from 'fastify';
import { itemController } from './item.controller';
import {
  createItemSchema,
  deleteItemSchema,
  readItemSchema,
  readItemsSchema,
  updateItemSchema,
} from './item.schema';

async function itemRoute(instance: FastifyInstance): Promise<void> {
  // Create
  instance.post('/item', createItemSchema, itemController.create);

  // Read all
  instance.get('/item', readItemsSchema, itemController.readAll);

  // Read
  instance.get('/item/:id', readItemSchema, itemController.read);

  // Update
  instance.patch('/item/:id', updateItemSchema, itemController.update);

  // Delete
  instance.delete('/item/:id', deleteItemSchema, itemController.delete);
}

export { itemRoute };
