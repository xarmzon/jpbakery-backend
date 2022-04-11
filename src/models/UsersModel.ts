import { USER_TYPES } from "@utils/constants";
import { User } from "@utils/types";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<User>(
  {
    fullName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
      index: true,
    },
    picture: {
      type: String,
    },
    role: {
      type: Number,
      default: USER_TYPES.CLIENT,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = model<User>("User", UserSchema);
export default UserModel;
