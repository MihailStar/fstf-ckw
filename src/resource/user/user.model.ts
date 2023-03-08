import { model, Schema } from 'mongoose';
import { user } from './user.schema';
import type { BaseUser } from './user.type';

const userSchema = new Schema<BaseUser>(
  {
    login: {
      type: String,
      minlength: user.properties.login.minLength,
      required: user.required.some((key) => key === 'login'),
      unique: true,
    },
    password: {
      type: String,
      minlength: user.properties.password.minLength,
      required: user.required.some((key) => key === 'password'),
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = model<BaseUser>('User', userSchema);

export { userModel };
