import { Document, Schema } from "mongoose";

export interface UserModelI extends Document {
  _id: string;
  username: string;
  email: string;
  isActive: boolean;
  password: string;
  expenses?: [Schema.Types.ObjectId];
  transactions?: [Schema.Types.ObjectId];
}

export interface createUserPayloadI {
  username: string;
  password: string;
  email: string;
  isActive: boolean;
}

export interface UserI {
  _id?: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  expenses?: [Schema.Types.ObjectId];
  transactions?: [Schema.Types.ObjectId];
}
