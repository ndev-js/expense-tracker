import winston from "winston";

export class Logger {
  private logger: winston.Logger;

  constructor(options: winston.LoggerOptions) {
    this.logger = winston.createLogger({
      level: options.level || "info",
      format: options.format || winston.format.json(),
      transports: options.transports || [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "combined.log" }),
      ],
    });
  }

  error(message: string, meta?: any) {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  info(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }

  silly(message: string, meta?: any) {
    this.logger.silly(message, meta);
  }
}
