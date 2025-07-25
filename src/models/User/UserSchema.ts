import { Schema, model } from "mongoose";
import { UserModelI } from "../../interfaces/User/UserType.js";
import bcrypt from "bcrypt";
const userSchema = new Schema<UserModelI>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    isActive: {
      type: Boolean,
      default: true,
    },

    expenses: {
      type: [Schema.Types.ObjectId],
      ref: "Expense",
      default: [],
    },
    transactions: {
      type: [Schema.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

userSchema.pre<UserModelI>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const SALT_ROUNDS = 10;
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});
export const User = model<UserModelI>("User", userSchema);
