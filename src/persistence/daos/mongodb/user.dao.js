import MongoDao from "./mongo.dao.js";
import { createHash, isValidPassword } from "../../../utils/utils.js";
import { UserModel } from "./models/user.model.js";
import CartDao from "./cart.dao.js";

const cartDao = new CartDao();

export default class UserDao extends MongoDao {
  constructor() {
    super(UserModel);
  }

  async getById(id) {
    try {
      const user = await UserModel.findById(id).populate("cart");
      return user || false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.getByEmail(email);

      if (!existUser) {
        const isAdmin = email === "admin@coder.com" && password === "admin1234";

        const cart = await cartDao.create({ items: [] });

        return await UserModel.create({
          ...user,
          role: isAdmin ? "admin" : "user",
          password: createHash(password),
          cart: cart._id,
        });
      } else return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.getByEmail(email);
      if (!userExist) return false;
      return isValidPassword(password, userExist) ? userExist : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByEmail(email) {
    try {
      const userExists = await UserModel.findOne({ email });
      return userExists ?? false;
    } catch (error) {
      console.log(error);
    }
  }
}
