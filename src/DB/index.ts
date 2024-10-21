import mongoose, { Mongoose } from "mongoose";

import Config from "../config/index";

class DATABASE {
  private static instance: DATABASE;
  private mongooseInstance: Mongoose | null = null;

  private constructor() {}

  public static getInstance(): DATABASE {
    if (!DATABASE.instance) {
      DATABASE.instance = new DATABASE();
    }
    return DATABASE.instance;
  }

  public async connect(): Promise<void> {
    if (this.mongooseInstance) {
      console.log("Using Cached DB Connection");
      return;
    }

    const config = Config.getInstance();
    const chalk = (await import("chalk")).default;

    const url = config.dbUrl;
    try {
      this.mongooseInstance = await mongoose.connect(url);
      console.log(chalk.magentaBright(`Connected to  the database: ${config.dbName} 🔥`));
    } catch (error) {
      console.error(`Error Connecting to the database: ${config.dbName} 😡`, error);
      throw new Error(`Failed to connect to the database: ${config.dbName} 😡`);
    }
  }
  public getMongooseInstance(): Mongoose {
    if (!this.mongooseInstance) {
      throw new Error("Database not initialized. Call connect() before using.");
    }
    return this.mongooseInstance;
  }
  public async close(): Promise<void> {
    if (this.mongooseInstance) {
      await mongoose.disconnect();
      console.log(`Disconnected from the database: ${Config.getInstance().dbName} 🔥`);
    }
  }
}

export default DATABASE;
