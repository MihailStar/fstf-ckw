import type { FromSchema } from 'json-schema-to-ts';
import type { HTTPStatusCode } from '../../common/constant';
import type {
  createItemDTO,
  createItemSchema,
  deleteItemSchema,
  item,
  readItemSchema,
  readItemsSchema,
  updateItemDTO,
  updateItemSchema,
} from './item.schema';

type Item = FromSchema<typeof item>;
type BaseItem = Omit<Item, 'id'>;

// Create
type CreateItemDTO = FromSchema<typeof createItemDTO>;
type CreateRouteBody = FromSchema<typeof createItemSchema['schema']['body']>;
type CreateRouteReply = FromSchema<
  typeof createItemSchema['schema']['response'][HTTPStatusCode.CREATED]
>;
type CreateRouteGeneric = {
  Body: CreateRouteBody;
  Reply: CreateRouteReply;
};

// Read all
type ReadAllRouteReply = FromSchema<
  typeof readItemsSchema['schema']['response'][HTTPStatusCode.OK]
>;
type ReadAllRouteGeneric = {
  Reply: ReadAllRouteReply;
};

// Read
type ReadRouteParams = FromSchema<typeof readItemSchema['schema']['params']>;
type ReadRouteReply = FromSchema<
  | typeof readItemSchema['schema']['response'][HTTPStatusCode.OK]
  | typeof readItemSchema['schema']['response'][HTTPStatusCode.NOT_FOUND]
>;
type ReadRouteGeneric = {
  Params: ReadRouteParams;
  Reply: ReadRouteReply;
};

// Update
type UpdateItemDTO = FromSchema<typeof updateItemDTO>;
type UpdateRouteParams = FromSchema<
  typeof updateItemSchema['schema']['params']
>;
type UpdateRouteBody = FromSchema<typeof updateItemSchema['schema']['body']>;
type UpdateRouteReply = FromSchema<
  | typeof updateItemSchema['schema']['response'][HTTPStatusCode.OK]
  | typeof updateItemSchema['schema']['response'][HTTPStatusCode.NOT_FOUND]
>;
type UpdateRouteGeneric = {
  Params: UpdateRouteParams;
  Body: UpdateRouteBody;
  Reply: UpdateRouteReply;
};

// Delete
type DeleteRouteParams = FromSchema<
  typeof deleteItemSchema['schema']['params']
>;
type DeleteRouteReply = FromSchema<
  | typeof deleteItemSchema['schema']['response'][HTTPStatusCode.OK]
  | typeof deleteItemSchema['schema']['response'][HTTPStatusCode.NOT_FOUND]
>;
type DeleteRouteGeneric = {
  Params: DeleteRouteParams;
  Reply: DeleteRouteReply;
};

export {
  Item,
  BaseItem,
  CreateItemDTO,
  CreateRouteGeneric,
  ReadAllRouteGeneric,
  ReadRouteGeneric,
  UpdateItemDTO,
  UpdateRouteGeneric,
  DeleteRouteGeneric,
};
