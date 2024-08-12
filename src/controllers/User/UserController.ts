// import { Request, Response } from "express";
// import { Logger } from "../../utils/log/Logger.js"; // Adjust import as per your file structure
// import AppError from "../../utils/ErrorHandler.js";
// import UserService from "../../services/User/User.Service.js";
// import winston from "winston";
// export default class UserController {
//   private userService: UserService;
//   private logger: Logger; // Declare logger as type Logger

//   constructor() {
//     this.userService = new UserService();
//     this.logger = new Logger({
//       level: "error",
//       format: winston.format.json(),
//       transports: [new winston.transports.File({ filename: "error.log" })],
//     });
//   }

//   async getAllUsers(req: Request, res: Response): Promise<any> {
//     try {
//       const users = await this.userService.GetAllUsers();
//       this.logger.info("users fetched successfully", users);
//       res.json({
//         success: true,
//         message: "users fetched successfully",
//         users: users,
//       });
//     } catch (error) {
//       // Ensure this.logger is properly initialized before using it
//       if (this.logger) {
//         this.logger.error("error", error);
//       } else {
//         console.error("Logger is not initialized:", error);
//       }
//       throw new AppError(error.message, 500);
//     }
//   }
// }

// UserController.ts

import { Request, Response } from "express";
import { Logger } from "../../utils/log/Logger.js"; // Adjust import path as per your project structure
import AppError from "../../utils/ErrorHandler.js";
import UserService from "../../services/User/User.Service.js";
import winston from "winston";
import { UserI } from "../../interfaces/User/UserType.js";

export default class UserController {
  private userService: UserService;
  private logger: Logger;

  constructor() {
    console.log("hello");

    this.userService = new UserService();
    this.logger = new Logger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "combined.log" }),
      ],
    });
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.GetAllUsers();
      this.logger.info("Users fetched successfully", { users });
      res.json({
        success: true,
        message: "Users fetched successfully",
        users,
      });
    } catch (error) {
      if (this.logger) {
        this.logger.error("Error fetching users", error);
      } else {
        console.error("Logger is not initialized:", error);
      }
      throw new AppError(error.message, 500);
    }
  }

  async createUser(req: Request, res: Response): Promise<any> {
    try {
      const payload: UserI = {
        username: req.body.username,
        password: req.body.password,
        isActive: req.body.isActive,
        email: req.body.email,
      };

      const user = await this.userService.createUser(payload);
      console.log(user, "------->");

      if (user.data) {
        this.logger.info("User created successfully", { user });
        res.json(user);
      }
      user.status === 400 && res.json(user);
      this.logger.error("Error creating user", user);
    } catch (error) {
      console.log(error);
      this.logger.error("Error creating user", error);
      res.json(error);
    }
  }
}
