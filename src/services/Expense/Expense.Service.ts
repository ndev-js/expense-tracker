import { HTTPStatusCode } from "../../constants/httpStatusCode";
import { createExpensePayload, ExpenseI } from "../../interfaces/Expense/ExpenseType";
import { Expense } from "../../models/Expense/ExpenseSchema";
import { User } from "../../models/User/UserSchema";
import createError from "http-errors";
import mongoose from "mongoose";
class ExpenseService {
  async createUserExpense(Payload: createExpensePayload): Promise<any> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const expense = new Expense(Payload);
      const user = await User.findById(Payload.userId);
      if (!user) {
        throw createError(HTTPStatusCode.NotFound, "User not found");
      }
      const saveExpense = await expense.save({
        session,
      });
      user.expenses?.push(saveExpense._id as mongoose.Schema.Types.ObjectId);
      await user.save({ session });
      await session.commitTransaction();
      return saveExpense;
    } catch (error: any) {
      console.log(error, "error");

      await session.abortTransaction();
      if (error.status && error.expose) {
        throw error;
      }
      throw createError(HTTPStatusCode.InternalServerError, "An unexpected error occurred");
    } finally {
      session.endSession();
    }
  }

  async getUserExpenses(userId: string): Promise<ExpenseI[]> {
    try {
      const expenses = await Expense.find({ userId });
      if (!expenses) {
        throw createError(HTTPStatusCode.NotFound, "Expenses not found");
      }
      return expenses;
    } catch (error: any) {
      if (error.status && error.expose) {
        throw error;
      }
      throw createError(HTTPStatusCode.InternalServerError, "An unexpected error occurred");
    }
  }
}

export default ExpenseService;
