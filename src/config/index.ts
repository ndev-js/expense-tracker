import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || "development";
dotenv.config({
  path: path.resolve(__dirname, `../../.env.${env}`),
});

console.log(env);

class Config {
  private static instance: Config;
  public readonly appPort: number;
  public readonly nodeEnv: string;
  public readonly dbHost: string;
  public readonly dbUrl: string;
  public readonly dbName: string;

  private constructor(
    appPort: number,
    nodeEnv: string,
    dbHost: string,
    dbUrl: string,
    dbName: string
  ) {
    this.appPort = appPort;
    this.nodeEnv = nodeEnv;
    this.dbHost = dbHost;
    this.dbUrl = dbUrl;
    this.dbName = dbName;
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config(
        Config.getNumberEnvVar("APP_PORT", process.env.APP_PORT),
        Config.getStringEnvVar("NODE_ENV", process.env.NODE_ENV, [
          "development",
          "production",
        ]),
        Config.getStringEnvVar("DB_HOST", process.env.DB_HOST),
        Config.validateUrl(process.env.DB_URL),
        Config.getStringEnvVar("DB_NAME", process.env.DB_NAME)
      );
    }
    return Config.instance;
  }

  private static getNumberEnvVar(
    key: string,
    value?: string,
    defaultValue: number = 0
  ): number {
    console.log(value);

    const stringValue = value ?? defaultValue.toString();
    console.log(stringValue, "hellpo");

    const parsed = parseInt(stringValue, 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 65535) {
      throw new Error(
        `Environment variable ${key} must be a valid number between 0 and 65535.`
      );
    }
    return parsed;
  }

  private static getStringEnvVar(
    key: string,
    value?: string,
    allowedValues?: string[]
  ): string {
    if (value === undefined || value.trim() === "") {
      throw new Error(`Missing or empty required environment variable: ${key}`);
    }
    if (allowedValues && !allowedValues.includes(value.trim())) {
      throw new Error(
        `Environment variable ${key} must be one of the allowed values: ${allowedValues.join(
          ", "
        )}`
      );
    }
    return value.trim();
  }

  private static validateUrl(urlStr?: string): string {
    if (!urlStr) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    try {
      new URL(urlStr);
    } catch (error) {
      throw new Error("Invalid DB_URL format. Must be a valid URL.");
    }
    return urlStr;
  }
}

export default Config;
