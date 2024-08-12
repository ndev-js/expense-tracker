import mongoose, { Document } from "mongoose";

// Define the interface for the schema
export interface TransactionI extends Document {
  userId: mongoose.Schema.Types.ObjectId; // Reference to User
  type: "income" | "expense" | "transfer"; // Enum-like type
  amount: number; // Amount of the transaction
  category?: string; // Optional field for categorization
  description?: string; // Optional description of the transaction
  date?: Date; // Optional date of the transaction
  account?: mongoose.Schema.Types.ObjectId; // Reference to Account
}
