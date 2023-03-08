import type { Types } from 'mongoose';

/**
 * Convert object with `_id` (ObjectId type) to object with `id` (string type)
 */
function convertToObjectWithId<Obj extends { _id: Types.ObjectId }>({
  _id: objectId,
  ...rest
}: Obj): { id: string } & Omit<Obj, '_id'> {
  return { id: objectId.toString(), ...rest };
}

export { convertToObjectWithId };
