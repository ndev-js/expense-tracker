import { Schema, model } from "mongoose";
import { ExpenseI } from "../../interfaces/Expense/ExpenseType.js";

const expenseSchema = new Schema<ExpenseI>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: false,
    },
    receipt: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Expense = model<ExpenseI>("Expense", expenseSchema);
