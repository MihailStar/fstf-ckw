import { model, Schema } from 'mongoose';
import { item } from './item.schema';
import type { BaseItem } from './item.type';

const itemSchema = new Schema<BaseItem>(
  {
    name: {
      type: String,
      minlength: item.properties.name.minLength,
      required: item.required.some((key) => key === 'name'),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const itemModel = model<BaseItem>('Item', itemSchema);

export { itemModel };
