import express from "express";
import Config from "./src/config/index";
import Database from "./src/DB/index";
import AppRoute from "./src/routes/index";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const startServer = async () => {
  try {
    const chalk = (await import("chalk")).default;
    const config = Config.getInstance();
    const db = Database.getInstance();
    const AppRouterPrefix = "/api";
    console.log(db);
    const { dbHost, nodeEnv, dbName, dbUrl, appPort } = config;
    app.use(AppRouterPrefix, AppRoute);
    console.log(
      chalk.yellow(`App Configurations:🔧 \n
        NodeEnvironment ---> ${nodeEnv} \n 
        Database ----> mongodb  \n 
        DBName ------> ${dbName} \n 
        DBUrl -------> ${dbUrl} \n
        APP_PORT -----> ${appPort} \n
        DB_HOST -------> ${dbHost} \n`)
    );
    // Check db instance
    if (!db) {
      throw new Error("Database instance is undefined.");
    }
    await db.connect();

    app.listen(config.appPort, () => {
      console.log(chalk.greenBright("server started successfully ✅ "));
      console.log(chalk.greenBright(`server started At 🌐  http://localhost:${appPort} `));
    });
  } catch (error) {
    console.error(`Error Starting the Server 😡: ${error} `);
    process.exit(1);
  }
};

startServer();
