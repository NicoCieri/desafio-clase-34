import ProductDaoMongo from "./mongodb/product.dao.js";
import UserDaoMongo from "./mongodb/user.dao.js";
import CartDaoMongo from "./mongodb/cart.dao.js";
import TicketDao from "./mongodb/ticket.dao.js";
import { initMongoDB } from "./mongodb/connection.js";

let userDao;
let productDao;
let cartDao;
let ticketDao;

let persistence = process.argv[2] || "mongo";

const initMongoPersistence = async () => {
  await initMongoDB();
  userDao = new UserDaoMongo();
  productDao = new ProductDaoMongo();
  cartDao = new CartDaoMongo();
  ticketDao = new TicketDao();
};

switch (persistence) {
  case "mongo":
    await initMongoPersistence();
    break;
  default:
    throw new Error("Invalid persistence");
}

export default { userDao, productDao, cartDao, ticketDao };
