import validator from "validator";
import { compare, hash } from "bcryptjs";
import { IRegError } from "./types";
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

export const validateAccountForm = (formData: any, cPass = false) => {
  const errors: IRegError[] = [];

  const { fullName, email, password, cPassword } = formData;
  const validFullName = validateFullName(
    typeof fullName === "object" ? fullName.value : fullName
  );
  if (!validFullName)
    errors.push({ name: "fullName", msg: MESSAGES.FORM.FULL_NAME });

  const validEmail = validateEmail(
    typeof email === "object" ? email.value : email
  );
  if (!validEmail) errors.push({ name: "email", msg: MESSAGES.FORM.EMAIL });

  const validPassword = validateRegPassword(
    typeof password === "object" ? password.value : password
  );
  if (!validPassword)
    errors.push({ name: "password", msg: MESSAGES.FORM.PASSWORD });

  if (cPass) {
    const p = typeof password === "object" ? password.value : password;
    const cp = typeof cPassword === "object" ? cPassword.value : cPassword;
    const validcPass = validateConfirmPassword(p, cp);
    if (!validcPass)
      errors.push({
        name: "cPassword",
        msg: MESSAGES.FORM.CPASSWORD,
      });
  }

  return errors;
};

export const validateUserPassword = async (
  password: string,
  hashPassword: string
) => await compare(password, hashPassword);

export const hashPassword = async (password: string) =>
  await hash(password, 12);
