import { Document } from "mongoose";
import { Request } from "express";

export type User = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  picture: string;
  role: number;
  createdAt: string;
};

export type NewUser = Omit<User, "_id" | "role" | "createdAt" | "picture"> & {
  cPassword?: string;
};
export type IncomingUser = NewUser;

export type DBUserData = Document<unknown, any, User> &
  User & {
    _id: string;
  };

export type Order = {
  _id: string;
  user: Omit<User, "password">;
  sampleCakeImage: string;
  cakeColors: string;
  cakeSize: "sm" | "md" | "lg";
  nameOnCake: string;
  deliveryDate: string;
  deliveryAddress: string;
  charges: number;
  createdAt: string;
};

export type NewOrder = Omit<Order, "user" | "createdAt" | "_id"> & {
  user: string;
};
export type IncomingOrder = NewOrder;

export type Payment = {
  _id: string;
  user: Omit<User, "password">;
  order: Order;
  charges: number;
  status: number;
  createdAt: string;
  reference: string;
};

export type NewPayment = Omit<
  Payment,
  "status" | "_id" | "user" | "order" | "createdAt"
> & {
  user: string;
  order: string;
};
export type IncomingPayment = NewPayment;

export interface RequestWithUserIdAndRole extends Request {
  userId?: string;
  userRole?: number;
}

export interface IError {
  name: string;
  msg: string;
}
export interface IRegError extends IError {}

export interface IPaging {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}
export interface IPagingData<T> {
  results: T[];
  paging: IPaging;
}
