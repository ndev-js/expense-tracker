import mongoose, { Schema } from "mongoose";
import { ResponseI } from "../../interfaces/Res/ResponseType";
import { Income } from "../../models/Income/IncomeSchema";
import ResponseService from "../../utils/res/ResponseService";
import { createIncomeI } from "../../interfaces/Income/IncomeType";
import { User } from "../../models/User/UserSchema";
import { HTTPStatusCode } from "../../constants/httpStatusCode";

interface IncomeModelI {
  userId: Schema.Types.ObjectId;
  categoryId: Schema.Types.ObjectId;
  amount: number;
  date?: Date;
  description?: string;
}
class IncomeService {
  async createUserIncome(Payload: createIncomeI): Promise<any> {
    try {
      const income = new Income(Payload);
      const user = await User.findById(Payload.userId);

      if (!user) {
        throw createError(HTTPStatusCode.NotFound, "User not found");
      }
      const saveIncome = await income.save();
      return saveIncome;
    } catch (error: any) {
      throw createError(HTTPStatusCode.InternalServerError, "An unexpected error occurred");
    }
  }

  async getAllIncomes(): Promise<any[]> {
    try {
      const income = await Income.find();
      return income;
    } catch (error: any) {
      return error;
    }
  }
  async getUserIncomes(userId: string): Promise<any[]> {
    try {
      const income = await Income.find({ userId: userId });
      return income;
    } catch (error: any) {
      return error;
    }
  }
}

export default IncomeService;
function createError(NotFound: HTTPStatusCode, arg1: string) {
  throw new Error("Function not implemented.");
}
