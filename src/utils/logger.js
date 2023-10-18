import { createLogger, format, transports, addColors } from "winston";
import { NODE_ENV } from "../config.js";
import { __dirname } from "./utils.js";

const { combine, printf, timestamp, colorize } = format;

const levels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};

const colors = {
  fatal: "red whiteBG",
  error: "red",
  warning: "yellow",
  info: "blue",
  http: "grey",
  debug: "white",
};

const consoleLevel = NODE_ENV === "DEV" ? "debug" : "info";

const timestampFormat = "YYYY-MM-DD HH:mm:ss";

const printLog = (info) =>
  `${info.level} | ${info.timestamp} | ${info.message}`;

addColors(colors);

const logger = createLogger({
  levels,
  transports: [
    new transports.File({
      filename: __dirname + "/logs/errors.log",
      level: "error",
      format: combine(
        timestamp({
          format: timestampFormat,
        }),
        printf(printLog)
      ),
    }),
    new transports.Console({
      level: consoleLevel,
      format: combine(
        timestamp({
          format: timestampFormat,
        }),
        colorize({ colors }),
        printf(printLog)
      ),
    }),
  ],
});

export default logger;
