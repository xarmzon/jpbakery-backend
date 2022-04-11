export type User = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  picture: string;
  role: number;
  createdAt: string;
};

export type Orders = {};

export interface IRegError {
  name: string;
  msg: string;
}
