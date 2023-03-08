import type { RouteHandler } from 'fastify';
import { HTTPStatusCode } from '../../common/constant';
import type { ReturnData } from '../../helper/return-data';
import { dataKey, returnData } from '../../helper/return-data';
import { itemService } from './item.service';
import type {
  CreateRouteGeneric,
  DeleteRouteGeneric,
  Item,
  ReadAllRouteGeneric,
  ReadRouteGeneric,
  UpdateRouteGeneric,
} from './item.type';

const itemController: {
  create: RouteHandler<CreateRouteGeneric>;
  readAll: RouteHandler<ReadAllRouteGeneric>;
  read: RouteHandler<ReadRouteGeneric>;
  update: RouteHandler<UpdateRouteGeneric>;
  delete: RouteHandler<DeleteRouteGeneric>;
} = {
  // Create
  async create(request, reply): Promise<ReturnData<Item>> {
    const { body: dto } = request;
    const { [dataKey]: createdItem } = await itemService.create(dto);

    void reply.code(HTTPStatusCode.CREATED);
    return returnData(createdItem);
  },

  // Read all
  async readAll(): Promise<ReturnData<Item[]>> {
    const { [dataKey]: readedItems } = await itemService.readAll();

    return returnData(readedItems);
  },

  // Read
  async read(request, reply): Promise<ReturnData<Item | null>> {
    const { id } = request.params;
    const { [dataKey]: readedItem } = await itemService.read(id);

    if (readedItem === null) {
      void reply.code(HTTPStatusCode.NOT_FOUND);
    }

    return returnData(readedItem);
  },

  // Update
  async update(request, reply): Promise<ReturnData<Item | null>> {
    const { id } = request.params;
    const { body: dto } = request;
    const { [dataKey]: updatedItem } = await itemService.update(id, dto);

    if (updatedItem === null) {
      void reply.code(HTTPStatusCode.NOT_FOUND);
    }

    return returnData(updatedItem);
  },

  // Delete
  async delete(request, reply): Promise<ReturnData<Item | null>> {
    const { id } = request.params;
    const { [dataKey]: deletedItem } = await itemService.delete(id);

    if (deletedItem === null) {
      void reply.code(HTTPStatusCode.NOT_FOUND);
    }

    return returnData(deletedItem);
  },
};

export { itemController };
