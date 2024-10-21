import { ResponseI } from "../../interfaces/Res/ResponseType";
import { createUserPayloadI, UserI } from "../../interfaces/User/UserType";
import { User } from "../../models/User/UserSchema";
import ResponseService from "../../utils/res/ResponseService";

class UserService {
  async createUser(Payload: createUserPayloadI): Promise<ResponseI> {
    try {
      const user = new User(Payload);

      const checkUser = await User.findOne({
        $or: [{ username: Payload.username }, { email: Payload.email }],
      });

      if (checkUser) {
        if (checkUser.username === Payload.username) {
          return ResponseService.error("User already exists with this username");
        }
        if (checkUser.email) {
          return ResponseService.error("User already exists with this email");
        }
      }

      const saveUser = await user.save();

      return ResponseService.success("User created successfully", saveUser);
    } catch (error: any) {
      return ResponseService.internalServerError("internal server Error", error.message);
    }
  }

  async GetAllUsers(): Promise<UserI[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error: any) {
      return error;
    }
  }
}

export default UserService;
