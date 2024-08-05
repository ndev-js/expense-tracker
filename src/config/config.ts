// import dotenv from 'dotenv';
// import { URL } from 'url';

// // Load environment variables from .env file
// dotenv.config();

// class Config {
//   private static instance: Config;

//   public readonly port: number;
//   public readonly databaseUrl: string;

//   private constructor(port: number, databaseUrl: string) {
//     this.port = port;
//     this.databaseUrl = databaseUrl;
//   }

//   public static getInstance(): Config {
//     if (!Config.instance) {
//       Config.instance = new Config(
//         Config.getNumberEnvVar('PORT', process.env.PORT),
//         Config.getEnvVar('DATABASE_URL', process.env.DATABASE_URL)
//       );
//     }
//     return Config.instance;
//   }

//   private static getNumberEnvVar(key: string, value?: string, defaultValue: number = 0): number {
//     const stringValue = value ?? defaultValue.toString();
//     const parsed = parseInt(stringValue, 10);
//     if (isNaN(parsed) || parsed <= 0 || parsed > 65535) {
//       throw new Error(`Environment variable ${key} must be a valid number between 1 and 65535.`);
//     }
//     return parsed;
//   }

//   private static getEnvVar(key: string, value?: string): string {
//     if (value === undefined || value.trim() === '') {
//       throw new Error(`Missing or empty required environment variable: ${key}`);
//     }
//     return value;
//   }

//   private static validateUrl(urlStr?: string): string {
//     if (!urlStr) {
//       throw new Error('DATABASE_URL environment variable is required');
//     }
//     try {
//       new URL(urlStr);
//     } catch (error) {
//       throw new Error('Invalid DATABASE_URL format. Must be a valid URL.');
//     }
//     return urlStr;
//   }
// }

// export default Config;
