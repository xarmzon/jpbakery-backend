import jwt from "jsonwebtoken";

export const generateToken = (data: any) => {
  const key = process.env.JWT_SECRET_KEY!;
  return jwt.sign(data, key, { expiresIn: "1d", subject: "User Access Token" });
};

export const verifyToken = (token: string) => {
  const key = process.env.JWT_SECRET_KEY!;
  return jwt.verify(token, key);
};
