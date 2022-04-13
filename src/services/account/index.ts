import UserModel from "@models/UserModel";
import { createError } from "@services/error/CustomError";
import { HTTP_REQUEST_CODES, MESSAGES } from "@utils/constants";
import { generateToken } from "@utils/token";
import { DBUserData } from "@utils/types";
import {
  hashPassword,
  validateAccountForm,
  validateUserPassword,
} from "@utils/validator";

export const createAccount = async (
  fullName: string,
  email: string,
  password: string
) => {
  const formErrors = validateAccountForm({ fullName, email, password });
  if (formErrors.length > 0) {
    createError(
      "You have error(s) in your registration form, please fix them",
      HTTP_REQUEST_CODES.BAD_REQUEST,
      formErrors
    );
    return;
  }
  const emailExist = await UserModel.findOne({ email });
  if (emailExist) {
    createError(MESSAGES.EMAIL_EXIST, HTTP_REQUEST_CODES.BAD_REQUEST);
    return;
  }
  const user = await UserModel.create({
    fullName,
    email,
    password: await hashPassword(password),
  });
  return { user, msg: MESSAGES.NEW_ACCOUNT_SUCCESSFUL };
};

export const loginAccount = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    createError(MESSAGES.NO_USER, HTTP_REQUEST_CODES.NOT_FOUND);
    return;
  }
  const isPassMatch = await validateUserPassword(password, user.password);
  if (!isPassMatch) {
    createError(MESSAGES.LOGIN_ERROR, HTTP_REQUEST_CODES.BAD_REQUEST);
    return;
  }

  return {
    msg: MESSAGES.LOGIN_SUCCESSFUL,
    token: generateToken({ id: user._id, role: user.role }),
    user: prepareUserData(user),
  };
};

export const updatePicture = async (userId: string, picture: string) => {
  if (!picture || picture.length < 1) {
    createError(
      "Please provide a valid image data",
      HTTP_REQUEST_CODES.BAD_REQUEST
    );
    return;
  }
  const user = await UserModel.findById(userId);
  if (!user) {
    createError(MESSAGES.NO_USER, HTTP_REQUEST_CODES.NOT_FOUND);
    return;
  }
  user.picture = picture;
  await user.save();
  return {
    user: prepareUserData(user),
    msg: "Profile Picture updated successfully",
  };
};

const prepareUserData = (user: DBUserData) => {
  return {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    createdAt: user.createdAt,
    picture: user.picture,
    role: user.role,
  };
};
