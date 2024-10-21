import { ResponseI } from "../../interfaces/Res/ResponseType";
import { Income } from "../../models/Income/IncomeSchema";
import ResponseService from "../../utils/res/ResponseService";

class IncomeService {
  async createUserIncome(Payload: any): Promise<ResponseI> {
    try {
      const income = new Income(Payload);

      const saveUser = await income.save();

      return ResponseService.success("User Income  created successfully", saveUser);
    } catch (error: any) {
      return ResponseService.internalServerError("internal server Error", error.message);
    }
  }

  async GetAllUsers(): Promise<any[]> {
    try {
      const income = await Income.find();
      return income;
    } catch (error: any) {
      return error;
    }
  }
}

export default IncomeService;
