import { Types } from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../../connection/database';
import type { ReturnData } from '../../helper/return-data';
import { dataKey } from '../../helper/return-data';
import { itemService } from './item.service';
import type { CreateItemDTO, Item, UpdateItemDTO } from './item.type';

let testItem: Item;
const nonExistItemId: Item['id'] = '62e0414a0fb9ab3416827c89';

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe('itemService.create', () => {
  const method = 'create';

  test('returns Item', async () => {
    const dto: CreateItemDTO = { name: 'created name' };
    const { [dataKey]: result } = await itemService[method](dto);

    expect(Types.ObjectId.isValid(result.id)).toBe(true);
    expect(result.name).toBe(dto.name);

    testItem = result;
  });
});

describe('itemService.readAll', () => {
  const method = 'readAll';

  test('returns Items', async () => {
    const { [dataKey]: result } = await itemService[method]();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe('itemService.read', () => {
  const method = 'read';

  test('returns null', async () => {
    const { [dataKey]: result } = await itemService[method](nonExistItemId);

    expect(result).toBe(null);
  });

  test('returns Item', async () => {
    const { [dataKey]: result } = (await itemService[method](
      testItem.id
    )) as ReturnData<Item>;

    expect(result.id).toBe(testItem.id);
    expect(result.name).toBe(testItem.name);
  });
});

describe('itemService.update', () => {
  const method = 'update';

  test('returns null', async () => {
    const dto: UpdateItemDTO = { name: 'updated name' };
    const { [dataKey]: result } = await itemService[method](
      nonExistItemId,
      dto
    );

    expect(result).toBe(null);
  });

  test('returns Item', async () => {
    const dto: UpdateItemDTO = { name: 'updated name' };
    const { [dataKey]: result } = (await itemService[method](
      testItem.id,
      dto
    )) as ReturnData<Item>;

    expect(result.id).toBe(testItem.id);
    expect(result.name).toBe(dto.name);

    testItem = result;
  });
});

describe('itemService.delete', () => {
  const method = 'delete';

  test('returns null', async () => {
    const { [dataKey]: result } = await itemService[method](nonExistItemId);

    expect(result).toBe(null);
  });

  test('returns Item', async () => {
    const { [dataKey]: result } = (await itemService[method](
      testItem.id
    )) as ReturnData<Item>;

    expect(result.id).toBe(testItem.id);
    expect(result.name).toBe(testItem.name);
  });

  test('returns null', async () => {
    const { [dataKey]: result } = await itemService[method](testItem.id);

    expect(result).toBe(null);
  });
});
