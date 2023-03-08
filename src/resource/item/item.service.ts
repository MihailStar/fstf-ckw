import { convertToObjectWithId } from '../../helper/convert-to-object-with-string-id';
import type { ReturnData } from '../../helper/return-data';
import { returnData } from '../../helper/return-data';
import { itemModel } from './item.model';
import type { CreateItemDTO, Item, UpdateItemDTO } from './item.type';

const itemService = {
  // Create
  async create(dto: CreateItemDTO): Promise<ReturnData<Item>> {
    const result = (await itemModel.create(dto)).toObject();

    return returnData(convertToObjectWithId(result));
  },

  // Read all
  async readAll(): Promise<ReturnData<Item[]>> {
    const result = await itemModel.find({}).lean().exec();

    return returnData(result.map(convertToObjectWithId));
  },

  // Read
  async read(id: Item['id']): Promise<ReturnData<Item | null>> {
    const result = await itemModel.findById(id).lean().exec();

    return returnData(result === null ? null : convertToObjectWithId(result));
  },

  // Update
  async update(
    id: Item['id'],
    dto: UpdateItemDTO
  ): Promise<ReturnData<Item | null>> {
    const result = await itemModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean()
      .exec();

    return returnData(result === null ? null : convertToObjectWithId(result));
  },

  // Delete
  async delete(id: Item['id']): Promise<ReturnData<Item | null>> {
    const result = await itemModel.findByIdAndDelete(id).lean().exec();

    return returnData(result === null ? null : convertToObjectWithId(result));
  },
};

export { itemService };
