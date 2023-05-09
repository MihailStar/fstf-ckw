import bcrypt from 'bcrypt';
import type { LeanDocument, Types } from 'mongoose';
import { mongo } from 'mongoose';
import { MongoDBStatusCode } from '../../common/constant';
import { convertToObjectWithId } from '../../helper/convert-to-object-with-string-id';
import type { ReturnData } from '../../helper/return-data';
import { returnData } from '../../helper/return-data';
import { throwError } from '../../helper/throw-error';
import { userModel } from './user.model';
import type { BaseUser, CreateUserDTO, LoginUserDTO, User } from './user.type';

const userService = {
  // Create
  async create(
    dto: CreateUserDTO
  ): Promise<ReturnData<User | import('mongodb').MongoServerError>> {
    let result: LeanDocument<BaseUser> & { _id: Types.ObjectId };
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      result = (
        await userModel.create({
          ...dto,
          password: hashedPassword,
        })
      ).toObject();
    } catch (reason) {
      if (
        reason instanceof mongo.MongoServerError &&
        reason.code === MongoDBStatusCode.DUPLICATE_KEY
      ) {
        return returnData(reason);
      }

      throwError(reason);
    }

    return returnData(
      convertToObjectWithId({ ...result, password: dto.password })
    );
  },

  // Login
  async login(dto: LoginUserDTO): Promise<ReturnData<User | null>> {
    const result = await userModel
      .findOne({ login: dto.login })
      .select('+password')
      .lean()
      .exec();

    if (result === null) {
      return returnData(null);
    }

    const isPasswordMatch = await bcrypt.compare(dto.password, result.password);

    return returnData(
      isPasswordMatch
        ? convertToObjectWithId({ ...result, password: dto.password })
        : null
    );
  },
};

export { userService };
