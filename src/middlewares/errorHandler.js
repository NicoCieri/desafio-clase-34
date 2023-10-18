import { HttpResponse } from "../utils/http.response.js";
import errors from "../utils/errors.dictionary.js";
import logger from "../utils/logger.js";

const http = new HttpResponse();

export const errorMiddleware = (error, req, res, next) => {
  logger.debug(error.stack);
  logger.debug(error);

  const status = error.statusCode || 500;
  const message = error.message || errors.DEFAULT;

  switch (status) {
    case 200:
      return http.Ok(res, message);
    case 404:
      logger.warning(message);
      return http.NotFound(res, message);
    case 401:
      logger.warning(message);
      return http.Unauthorized(res, message);
    case 403:
      logger.warning(message);
      return http.Forbidden(res, message);
    case 409:
      logger.warning(message);
      return http.Conflict(res, message);
    default:
      logger.error(message);
      return http.ServerError(res, message);
  }
};
