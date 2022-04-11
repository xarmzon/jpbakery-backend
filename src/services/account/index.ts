import UserModel from "@models/UsersModel";
import { createError } from "@services/Error/CustomError";
import { HTTP_REQUEST_CODES, MESSAGES } from "@utils/constants";
import { hashPassword, validateAccountForm } from "@utils/validator";

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
