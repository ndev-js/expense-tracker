import mongoose, { Document } from "mongoose";

// Define the interface for individual expense items
interface IExpenseItem {
  category?: string; // Optional category for the expense
  amount: number; // Amount of the expense
}

// Define the interface for the budget schema
export interface IBudget extends Document {
  userId: mongoose.Schema.Types.ObjectId; // Reference to User
  income: number; // Total income
  expenses: IExpenseItem[]; // Array of expense items
}
