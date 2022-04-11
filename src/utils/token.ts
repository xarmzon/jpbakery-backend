import jwt from "jsonwebtoken";

const key = process.env.JWT_SECRET_KEY!;

export const generateToken = (data: any) => {
  return jwt.sign(data, key, { expiresIn: "7d", subject: "User Access Token" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, key);
};
