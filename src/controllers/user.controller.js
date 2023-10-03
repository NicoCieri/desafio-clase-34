import UserService from "../services/user.services.js";
import { createResponse } from "../utils/utils.js";
import Controller from "./class.controller.js";
import { sendEmailWithTemplate } from "../services/email.services.js";
import { successfulRegisterTemplate } from "../templates/email.templates.js";
import { HttpResponse } from "../utils/http.response.js";
import errors from "../utils/errors.dictionary.js";

const userService = new UserService();
const http = new HttpResponse();
export default class UserController extends Controller {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const newUser = await userService.register(req.body);

      await sendEmailWithTemplate({
        email: newUser.email,
        subject: "Wellcome!",
        html: successfulRegisterTemplate(newUser.first_name),
      });

      return newUser
        ? http.Ok(res, newUser)
        : http.Conflict(res, errors.USER_EXISTS);
    } catch (error) {
      next(error.message);
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await userService.login(req.body);

      if (!token) return http.Unauthorized(res, errors.INVALID_CREDENTIALS);

      res.cookie("token", token, { httpOnly: true });
      return http.Ok(res, { token });
    } catch (error) {
      next(error.message);
    }
  };

  registerFront = async (req, res, next) => {
    try {
      const newUser = await userService.register(req.body);

      await sendEmailWithTemplate({
        email: newUser.email,
        subject: "Wellcome!",
        html: successfulRegisterTemplate(newUser.first_name),
      });

      if (!newUser) res.redirect("/error-register");
      else res.redirect("/login?registerSuccessful=true");
    } catch (error) {
      next(error.message);
    }
  };

  loginFront = async (req, res, next) => {
    try {
      const token = await userService.login(req.body);

      if (!token) return res.redirect("/error-login");

      res.cookie("token", token, { httpOnly: true });
      res.redirect("/products?loginSuccessful=true");
    } catch (error) {
      next(error.message);
    }
  };

  logout = (req, res) => {
    res.clearCookie("token");
  };

  logoutFront = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
  };
}
