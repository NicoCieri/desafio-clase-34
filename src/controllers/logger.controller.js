import logger from "../utils/logger.js";

export const loggerTest = (req, res) => {
  logger.debug("Debug message");
  logger.http("HTTP message");
  logger.info("Info message");
  logger.warning("Warn message");
  logger.error("Error message");
  logger.fatal("Fatal message");

  res.json({ message: "Logger test" });
};
