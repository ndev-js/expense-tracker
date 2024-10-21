import { Document, Schema } from "mongoose";

export interface IncomeModelI extends Document {
  userId: Schema.Types.ObjectId;
  categoryId: Schema.Types.ObjectId;
  amount: number;
  date: Date;
  description?: string;
}

export interface createIncomeI {
  userId: Schema.Types.ObjectId;
  categoryId: Schema.Types.ObjectId;
  amount: number;
  date: Date;
  description?: string;
}
export interface incomeResI {
  userId: Schema.Types.ObjectId;
  categoryId: Schema.Types.ObjectId;
  amount: number;
  date: Date;
  description?: string;
}
