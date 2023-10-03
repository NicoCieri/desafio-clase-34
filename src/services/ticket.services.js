import { v4 as uuidv4 } from "uuid";
import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
import { splitITemsByStock } from "../utils/utils.js";

const { ticketDao, productDao, cartDao } = factory;

export default class TicketService extends Services {
  constructor() {
    super(ticketDao);
  }

  async generateTicket(cartId, user) {
    try {
      if (user.cart._id.toString() !== cartId) return false;

      const cart = await cartDao.getById(cartId);
      const products = splitITemsByStock(cart.items);

      if (products.available.length === 0) return false;

      const ticket = await ticketDao.create({
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),
        amount: products.available.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
        purchaser: user.email,
        items: products.available,
      });

      if (!ticket) return false;

      for (const item of products.available) {
        const newStock = item.product.stock - item.quantity;
        await productDao.update(item.product._id, { stock: newStock });
      }

      await cartDao.updateCartItems(user.cart._id, products.unavailable);

      return { ticket, notPurchased: products.unavailable };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
