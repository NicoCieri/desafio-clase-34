import { HttpResponse } from "../utils/http.response.js";
import errors from "../utils/errors.dictionary.js";

const http = new HttpResponse();

export const errorMiddleware = (error, req, res, next) => {
  console.log(error.stack);

  console.log(error);

  const status = error.statusCode || 500;
  const message = error.message || errors.DEFAULT;

  console.log(status);

  switch (status) {
    case 200:
      return http.Ok(res, message);
    case 404:
      return http.NotFound(res, message);
    case 401:
      return http.Unauthorized(res, message);
    case 403:
      return http.Forbidden(res, message);
    case 409:
      return http.Conflict(res, message);
    default:
      return http.ServerError(res, message);
  }
};
