import { model, Schema } from "mongoose";
import { IncomeModelI } from "../../interfaces/Income/IncomeType.js";

const incomeSchema = new Schema<IncomeModelI>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Income = model<IncomeModelI>("Income", incomeSchema);
