import { Types } from 'mongoose';
// eslint-disable-next-line node/no-unpublished-import
import supertest from 'supertest';
import { HTTPStatusCode } from '../common/constant';
import { connectDatabase, disconnectDatabase } from '../connection/database';
import type { ReturnData } from '../helper/return-data';
import type {
  CreateItemDTO,
  Item,
  UpdateItemDTO,
} from '../resource/item/item.type';
import { startServer } from '../server';

let testItem: Item;
const nonExistItemId: Item['id'] = '62e0414a0fb9ab3416827c89';

const server = startServer();
const request = supertest(server.server);

beforeAll(async () => {
  await connectDatabase();
  await server.ready();
});

afterAll(async () => {
  await disconnectDatabase();
  await server.close();
});

describe('Create', () => {
  test('validate DTO', async () => {
    expect((await request.post('/item').send()).status).toBe(
      HTTPStatusCode.BAD_REQUEST
    );
    expect((await request.post('/item').send({})).status).toBe(
      HTTPStatusCode.BAD_REQUEST
    );
  });

  test('returns Item', async () => {
    const dto: CreateItemDTO = { name: 'created name' };
    const response = await request.post('/item').send(dto);
    const { body } = response as { body: ReturnData<Item> };

    expect(response.status).toBe(HTTPStatusCode.CREATED);

    expect(Types.ObjectId.isValid(body.data.id)).toBe(true);
    expect(body.data.name).toBe(dto.name);

    testItem = body.data;
  });

  test('read after create', async () => {
    const response = await request.get(`/item/${testItem.id}`).send();
    const { body } = response as { body: ReturnData<Item> };

    expect(response.status).toBe(HTTPStatusCode.OK);

    expect(body.data.id).toBe(testItem.id);
    expect(body.data.name).toBe(testItem.name);
  });
});

describe('Read All', () => {
  test('returns Items', async () => {
    const response = await request.get('/item').send();
    const { body } = response as { body: ReturnData<Item[]> };

    expect(response.status).toBe(HTTPStatusCode.OK);

    expect(Array.isArray(body.data)).toBe(true);
  });
});

describe('Read', () => {
  test('returns null', async () => {
    const response = await request.get(`/item/${nonExistItemId}`).send();
    const { body } = response as { body: ReturnData<null> };

    expect(response.status).toBe(HTTPStatusCode.NOT_FOUND);

    expect(body.data).toBe(null);
  });

  test('returns Item', async () => {
    const response = await request.get(`/item/${testItem.id}`).send();
    const { body } = response as { body: ReturnData<Item> };

    expect(response.status).toBe(HTTPStatusCode.OK);

    expect(body.data.id).toBe(testItem.id);
    expect(body.data.name).toBe(testItem.name);
  });
});

describe('Update', () => {
  test('validate DTO', async () => {
    expect((await request.post('/item').send()).status).toBe(
      HTTPStatusCode.BAD_REQUEST
    );
    expect((await request.post('/item').send({})).status).toBe(
      HTTPStatusCode.BAD_REQUEST
    );
  });

  test('returns null', async () => {
    const dto: UpdateItemDTO = { name: 'updated name' };
    const response = await request.patch(`/item/${nonExistItemId}`).send(dto);
    const { body } = response as { body: ReturnData<null> };

    expect(response.status).toBe(HTTPStatusCode.NOT_FOUND);

    expect(body.data).toBe(null);
  });

  test('returns Item', async () => {
    const dto: UpdateItemDTO = { name: 'updated name' };
    const response = await request.patch(`/item/${testItem.id}`).send(dto);
    const { body } = response as { body: ReturnData<Item> };

    expect(response.status).toBe(HTTPStatusCode.OK);

    expect(body.data.id).toBe(testItem.id);
    expect(body.data.name).toBe(dto.name);

    testItem = body.data;
  });

  test('read after update', async () => {
    const response = await request.get(`/item/${testItem.id}`).send();
    const { body } = response as { body: ReturnData<Item> };

    expect(response.status).toBe(HTTPStatusCode.OK);

    expect(body.data.id).toBe(testItem.id);
    expect(body.data.name).toBe(testItem.name);
  });
});

describe('Delete', () => {
  test('validate DTO', async () => {
    expect((await request.post('/item').send()).status).toBe(
      HTTPStatusCode.BAD_REQUEST
    );
    expect((await request.post('/item').send({})).status).toBe(
      HTTPStatusCode.BAD_REQUEST
    );
  });

  test('returns null', async () => {
    const response = await request.delete(`/item/${nonExistItemId}`).send();
    const { body } = response as { body: ReturnData<null> };

    expect(response.status).toBe(HTTPStatusCode.NOT_FOUND);

    expect(body.data).toBe(null);
  });

  test('returns Item', async () => {
    const response = await request.delete(`/item/${testItem.id}`).send();
    const { body } = response as { body: ReturnData<Item> };

    expect(response.status).toBe(HTTPStatusCode.OK);

    expect(body.data.id).toBe(testItem.id);
    expect(body.data.name).toBe(testItem.name);
  });

  test('read after delete', async () => {
    const response = await request.delete(`/item/${testItem.id}`).send();
    const { body } = response as { body: ReturnData<null> };

    expect(response.status).toBe(HTTPStatusCode.NOT_FOUND);

    expect(body.data).toBe(null);
  });
});
