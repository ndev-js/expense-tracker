import { Request, Response } from "express";
import { Logger } from "../../utils/log/Logger"; // Adjust import path as per your project structure
import AppError from "../../utils/ErrorHandler";
import UserService from "../../services/User/User.Service";
import winston from "winston";
import { UserI } from "../../interfaces/User/UserType";

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
      transports: [new winston.transports.Console(), new winston.transports.File({ filename: "combined.log" })],
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
    } catch (error: any) {
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
      } else {
        const { status, message, error } = user;
        this.logger.error("Error creating user:", { error });
        res.status(status || 500).json({ message, error });
      }
    } catch (error) {
      console.log(error);
      this.logger.error("Error creating user", error);
      res.json(error);
    }
  }
}
