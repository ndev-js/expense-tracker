import express from "express";
import Config from "./config/index.js";
import Database from "./DB/index.js";
import chalk from "chalk";
import AppRoute from "./routes/index.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
const startServer = async () => {
  try {
    const config = Config.getInstance();
    const db = Database.getInstance();

    console.log(db);
    const { dbHost, nodeEnv, dbName, dbUrl, appPort } = config;
    app.use(AppRoute);
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
      console.log(
        chalk.greenBright(`server started At 🌐  http:localhost:${appPort} `)
      );
    });
  } catch (error) {
    console.error(`Error Starting the Server 😡: ${error} `);
    process.exit(1);
  }
};

startServer();
