import ProductServices from "../services/product.services.js";
import { stringToBoolean } from "../utils/utils.js";
import { HttpResponse } from "../utils/http.response.js";
import errors from "../utils/errors.dictionary.js";

const service = new ProductServices();
const http = new HttpResponse();

export const getAll = async (req, res, next) => {
  try {
    const { limit, page, sortOrder, category, available } = req.query;

    const result = await service.getAllPaginated({
      limit,
      page,
      sortOrder,
      category,
      available: stringToBoolean(available),
    });

    return http.Ok(res, result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    return product
      ? http.Ok(res, product)
      : http.NotFound(res, errors.PRODUCT_NOT_FOUND);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const product = req.body;
    product.thumbnails = [req.file.filename];
    product.status = product.status ?? true;
    const newProduct = await service.create(product);

    return newProduct
      ? http.Ok(res, newProduct)
      : http.ServerError(res, errors.PRODUCT_NOT_CREATED);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = req.body;

    if (req.file) {
      product.thumbnails = [req.file.filename];
    }

    const uptatedProduct = await service.update(id, product);

    return uptatedProduct
      ? http.Ok(res, uptatedProduct)
      : http.NotFound(res, errors.PRODUCT_NOT_UPDATED);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedProduct = await service.delete(id);

    return removedProduct
      ? http.Ok(res, removedProduct)
      : http.NotFound(res, errors.PRODUCT_NOT_DELETED);
  } catch (error) {
    next(error.message);
  }
};

export const getProductsMock = async (req, res, next) => {
  try {
    const products = await service.getProductsMock();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
