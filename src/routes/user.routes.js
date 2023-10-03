import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";

const controller = new UserController();

const router = Router();

router.get("/", requireAuth, authorize(["admin"]), controller.getAll);
router.post("/register", controller.register);
router.post("/register-front", controller.registerFront);
router.post("/login", controller.login);
router.post("/login-front", controller.loginFront);
router.get("/logout", controller.logout);
router.get("/logout-front", controller.logoutFront);

export default router;
