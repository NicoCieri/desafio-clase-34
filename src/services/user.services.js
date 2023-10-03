import "dotenv/config";
import jwt from "jsonwebtoken";
import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
import UserRepository from "../persistence/repository/user.repository.js";
import { PRIVATE_KEY } from "../config.js";

const userRepository = new UserRepository();

const { userDao } = factory;

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  #generateToken(user) {
    const payload = {
      userId: user.id,
    };
    return jwt.sign(payload, PRIVATE_KEY, { expiresIn: "10m" });
  }

  async register(user) {
    try {
      return await userDao.register(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(user) {
    try {
      const userExist = await userDao.login(user);
      return userExist ? this.#generateToken(userExist) : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByIdDTO(id) {
    try {
      const user = await userRepository.getByIdDTO(id);
      return user ? user : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
