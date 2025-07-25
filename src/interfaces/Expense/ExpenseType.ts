import mongoose, { Document } from "mongoose";

// Define the interface for the expense schema
export interface ExpenseI extends Document {
  userId: mongoose.Schema.Types.ObjectId; // Reference to User
  amount: number; // Amount of the expense
  category: mongoose.Schema.Types.ObjectId; // Category of the expense
  description?: string; // Optional description of the expense
  date?: Date; // Optional date of the expense
  receipt?: string; // Optional file path or cloud storage reference
}

export interface createExpensePayload {
  userId: string;
  amount: number;
  category: string;
  description?: string;
  date?: Date;
  receipt?: string;
}
