import * as service from "../services/cart.services.js";
import TicketService from "../services/ticket.services.js";
import { sendEmailWithTemplate } from "../services/email.services.js";
import { successfulPurchaseTemplate } from "../templates/email.templates.js";
import { HttpResponse } from "../utils/http.response.js";
import errors from "../utils/errors.dictionary.js";

const ticketService = new TicketService();
const http = new HttpResponse();

export const getAll = async (req, res, next) => {
  try {
    const items = await service.getAll();
    return http.Ok(res, items);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await service.getById(id);
    return cart
      ? http.Ok(res, cart)
      : http.NotFound(res, errors.CART_NOT_FOUND);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const cart = await service.create();
    return cart
      ? http.Ok(res, cart)
      : http.ServerError(res, errors.CART_NOT_CREATED);
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { id, productId } = req.params;
    const cart = await service.addProductToCart(id, productId);

    return cart
      ? http.Ok(res, cart)
      : http.NotFound(res, errors.CART_NOT_UPDATED);
  } catch (error) {
    next(error);
  }
};

export const removeProductFromCart = async (req, res, next) => {
  try {
    const { id, productId } = req.params;
    const cart = await service.removeProductFromCart(id, productId);

    return cart
      ? http.Ok(res, cart)
      : http.NotFound(res, errors.CART_NOT_UPDATED);
  } catch (error) {
    next(error);
  }
};

export const updateCartItems = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { items } = req.body;
    const cart = await service.updateCartItems(id, items);

    return cart
      ? http.Ok(res, cart)
      : http.NotFound(res, errors.CART_NOT_UPDATED);
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantity = async (req, res, next) => {
  try {
    const { id, productId } = req.params;
    const { quantity } = req.body;
    const cart = await service.updateProductQuantity(
      id,
      productId,
      Number(quantity)
    );

    return cart
      ? http.Ok(res, cart)
      : http.NotFound(res, errors.CART_NOT_UPDATED);
  } catch (error) {
    next(error);
  }
};

export const removeProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await service.removeProducts(id);

    return cart
      ? http.Ok(res, cart)
      : http.NotFound(res, errors.CART_NOT_UPDATED);
  } catch (error) {
    next(error);
  }
};

export const purchaseCart = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const result = await ticketService.generateTicket(id, user);
    if (!result) return http.ServerError(res, errors.TICKET_NOT_GENERATED);

    const ticket = await ticketService.getById(result.ticket._id);

    await sendEmailWithTemplate({
      email: user.email,
      subject: "New purchase confirmed!",
      html: successfulPurchaseTemplate(ticket),
    });

    return http.Ok(res, result);
  } catch (error) {
    next(error.message);
  }
};
