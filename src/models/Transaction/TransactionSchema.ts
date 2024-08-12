import { Schema, model } from "mongoose";
import { TransactionI } from "../../interfaces/Transaction/TransactionType.js";

const transactionSchema = new Schema<TransactionI>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    type: {
      type: String,
      enum: ["income", "expense", "transfer"],
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
    account: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export const Transaction = model<TransactionI>(
  "Transaction",
  transactionSchema
);
