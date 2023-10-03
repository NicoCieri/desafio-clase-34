import { areProductFieldsValid } from "../utils/utils.js";
import { HttpResponse } from "../utils/http.response.js";
import errors from "../utils/errors.dictionary.js";

const http = new HttpResponse();

const validateProduct = (req, res, next) => {
  const isProductValid = areProductFieldsValid(req.body);

  if (!isProductValid) return http.BadRequest(res, errors.PRODUCT_INVALID);
  else next();
};

export default validateProduct;
