import { HTTPStatusCode } from "../../constants/httpStatusCode";
import { createUserPayloadI, UserI } from "../../interfaces/User/UserType";
import { User } from "../../models/User/UserSchema";
import createError from "http-errors";
class UserService {
  async createUser(Payload: createUserPayloadI): Promise<UserI> {
    try {
      const user = new User(Payload);
      const checkUser = await User.findOne({
        $or: [{ username: Payload.username }, { email: Payload.email }],
      });
      if (checkUser) {
        if (checkUser.username === Payload.username) {
          throw createError(HTTPStatusCode.Conflict, "User already exists with this username");
        }
        if (checkUser.email) {
          throw createError(HTTPStatusCode.Conflict, "User already exists with this email");
        }
      }
      const saveUser = await user.save();
      return saveUser;
    } catch (error: any) {
      if (error.status && error.expose) {
        throw error;
      }
      throw createError(HTTPStatusCode.InternalServerError, "An unexpected error occurred");
    }
  }

  async GetAllUsers(): Promise<UserI[]> {
    try {
      const users = await User.find().populate("expenses");
      return users;
    } catch (error: any) {
      if (error.status && error.expose) {
        throw error;
      }
      throw createError(HTTPStatusCode.InternalServerError, "An unexpected error occurred");
    }
  }

  async GetUserById(payload: string): Promise<UserI> {
    console.log(payload, "payload");

    try {
      const user = await User.findById(payload).populate("expenses");
      console.log(user, "userid");

      if (!user) {
        throw createError(HTTPStatusCode.NotFound, "User not found");
      }
      return user;
    } catch (error: any) {
      if (error.status && error.expose) {
        throw error;
      }
      throw createError(HTTPStatusCode.InternalServerError, "An unexpected error occurred");
    }
  }
}

export default UserService;
