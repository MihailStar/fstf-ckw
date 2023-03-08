import { HTTPStatusCode } from '../../common/constant';
import { dataKey, returnData } from '../../helper/return-data';

const itemTagName = 'item'; // for Swagger

const item = {
  additionalProperties: false,
  type: 'object',
  properties: {
    id: {
      description: 'Item id',
      type: 'string',
      pattern: '^[0-9A-Fa-f]{24}$',
    },
    name: {
      type: 'string',
      minLength: 3,
    },
  },
  required: ['id', 'name'],
} as const;

// Create
const createItemDTO = {
  additionalProperties: false,
  type: 'object',
  properties: {
    name: item.properties.name,
  },
  required: ['name'],
} as const;

const createItemSchema = {
  schema: {
    summary: 'Create',
    body: createItemDTO,
    response: {
      [HTTPStatusCode.CREATED]: {
        type: 'object',
        properties: returnData(item),
        required: [dataKey],
      },
    },
    tags: [itemTagName] as string[],
  },
} as const;

// Read all
const readItemsSchema = {
  schema: {
    summary: 'Read all',
    response: {
      [HTTPStatusCode.OK]: {
        type: 'object',
        properties: returnData({ type: 'array', items: item } as const),
        required: [dataKey],
      },
    },
    tags: [itemTagName] as string[],
  },
} as const;

// Read
const readItemSchema = {
  schema: {
    summary: 'Read',
    params: {
      type: 'object',
      properties: {
        id: item.properties.id,
      },
      required: ['id'],
    },
    response: {
      [HTTPStatusCode.OK]: {
        type: 'object',
        properties: returnData(item),
        required: [dataKey],
      },
      [HTTPStatusCode.NOT_FOUND]: {
        type: 'object',
        properties: returnData({ type: 'null' } as const),
        required: [dataKey],
      },
    },
    tags: [itemTagName] as string[],
  },
} as const;

// Update
const updateItemDTO = {
  additionalProperties: false,
  type: 'object',
  properties: {
    name: item.properties.name,
  },
  required: [],
} as const;

const updateItemSchema = {
  schema: {
    summary: 'Update',
    params: {
      type: 'object',
      properties: {
        id: item.properties.id,
      },
      required: ['id'],
    },
    body: updateItemDTO,
    response: {
      [HTTPStatusCode.OK]: {
        type: 'object',
        properties: returnData(item),
        required: [dataKey],
      },
      [HTTPStatusCode.NOT_FOUND]: {
        type: 'object',
        properties: returnData({ type: 'null' } as const),
        required: [dataKey],
      },
    },
    tags: [itemTagName] as string[],
  },
} as const;

// Delete
const deleteItemSchema = {
  schema: {
    summary: 'Delete',
    params: {
      type: 'object',
      properties: {
        id: item.properties.id,
      },
      required: ['id'],
    },
    response: {
      [HTTPStatusCode.OK]: {
        type: 'object',
        properties: returnData(item),
        required: [dataKey],
      },
      [HTTPStatusCode.NOT_FOUND]: {
        type: 'object',
        properties: returnData({ type: 'null' } as const),
        required: [dataKey],
      },
    },
    tags: [itemTagName] as string[],
  },
} as const;

export {
  itemTagName,
  item,
  createItemDTO,
  createItemSchema,
  readItemsSchema,
  readItemSchema,
  updateItemDTO,
  updateItemSchema,
  deleteItemSchema,
};
