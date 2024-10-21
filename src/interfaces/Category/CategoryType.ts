import { Document } from "mongoose";
export interface CategoryModelI extends Document {
  name: string;
}

export interface CategoryResI {
  name: string;
  _id: string;
}

export interface CreateCategoryI {
  name: string;
}
