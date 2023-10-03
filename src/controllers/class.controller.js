import { HttpResponse } from "../utils/http.response.js";
import errors from "../utils/errors.dictionary.js";

export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const items = await this.service.getAll();
      return http.Ok(res, items);
    } catch (error) {
      next(error.message);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      return item
        ? http.Ok(res, item)
        : http.NotFound(res, errors.ITEM_NOT_FOUND);
    } catch (error) {
      next(error.message);
    }
  };

  create = async (req, res, next) => {
    try {
      const newItem = await this.service.create(req.body);
      return newItem
        ? http.Ok(res, newItem)
        : http.ServerError(res, errors.ITEM_NOT_CREATED);
    } catch (error) {
      next(error.message);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item) return http.NotFound(res, errors.ITEM_NOT_FOUND);
      else {
        const newItem = await this.service.update(id, req.body);
        return newItem
          ? http.Ok(res, newItem)
          : http.ServerError(res, errors.ITEM_NOT_UPDATED);
      }
    } catch (error) {
      next(error.message);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item) return http.NotFound(res, errors.ITEM_NOT_FOUND);
      else {
        const deletedItem = await this.service.delete(id);
        return deletedItem
          ? http.Ok(res, deletedItem)
          : http.ServerError(res, errors.ITEM_NOT_DELETED);
      }
    } catch (error) {
      next(error.message);
    }
  };
}
