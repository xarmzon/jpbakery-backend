import validator from "validator";
import { compare, hash } from "bcryptjs";
import { IncomingOrder, IRegError, IError, IncomingUser } from "./types";
import { MESSAGES } from "./constants";

export const validateEmail = (email: string) => {
  return validator.isEmail(email);
};

export const validateFullName = (fullName: string) => {
  return /^[a-zA-Z][a-zA-Z\s]{6,50}$/.test(fullName);
};

export const validateRegPassword = (password: string) => {
  const minLength = 6;
  const minSymbols = 0;
  return validator.isStrongPassword(password, { minLength, minSymbols });
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
};

export const validateAccountForm = (formData: IncomingUser, cPass = false) => {
  const errors: IRegError[] = [];

  const { fullName, email, password, cPassword } = formData;

  if (!validateFullName(fullName))
    errors.push({ name: "fullName", msg: MESSAGES.FORM.FULL_NAME });

  if (!validateEmail(email))
    errors.push({ name: "email", msg: MESSAGES.FORM.EMAIL });

  if (!validateRegPassword(password))
    errors.push({ name: "password", msg: MESSAGES.FORM.PASSWORD });

  if (cPass) {
    if (!validateConfirmPassword(password, cPassword as string))
      errors.push({
        name: "cPassword",
        msg: MESSAGES.FORM.CPASSWORD,
      });
  }

  return errors;
};

export const validateNewData = <T>(data: T) => {
  const errors: IError[] = [];

  Object.entries(data).forEach((entry) => {
    const [key, val] = entry;
    if (typeof val === "string") {
      if (!val || !(val.length > 0))
        errors.push({ name: key, msg: `This field value is missing` });
    } else {
      if (!val || val < 500)
        errors.push({
          name: key,
          msg: `This field value is missing or less than 500`,
        });
    }
  });

  return errors;
};

export const validateUserPassword = async (
  password: string,
  hashPassword: string
) => await compare(password, hashPassword);

export const hashPassword = async (password: string) =>
  await hash(password, 12);
