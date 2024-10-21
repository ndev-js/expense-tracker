import { Schema, model } from "mongoose";

const categorySchema = new Schema<any>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category = model<any>("Category", categorySchema);