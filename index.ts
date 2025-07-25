import express from "express";
import Config from "./src/config/index";
import Database from "./src/DB/index";
import AppRoute from "./src/routes/index";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { ExceptionHandler } from "./src/classes/Exceptionshandler/ExceptionHandlers";
import { HTTPStatusCode } from "./src/constants/httpStatusCode";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const startServer = async () => {
  try {
    const chalk = (await import("chalk")).default;
    const config = Config.getInstance();
    const db = Database.getInstance();
    const AppRouterPrefix = "/api";
    const { dbHost, appPort } = config;
    app.use(AppRouterPrefix, AppRoute);

    // Check db instance
    if (!db) {
      throw new Error("Database instance is undefined.");
    }
    await db.connect();
    // Catch 404 and forward to error handler
    app.use((req: Request, res: Response, next: NextFunction) => {
      next(createHttpError(HTTPStatusCode.NotFound, "Resource not found"));
    });

    // Global error handler
    app.use(ExceptionHandler);
    app.listen(config.appPort, () => {
      console.log(chalk.greenBright("server started successfully ✅ "));
      console.log(chalk.greenBright(`server started At 🌐  http://localhost:${appPort} `));
      console.log(chalk.yellowBright(`Database Connected 📅  dbHost:${dbHost} `));
    });
  } catch (error) {
    console.error(`Error Starting the Server 😡: ${error} `);
    process.exit(1);
  }
};

startServer();
