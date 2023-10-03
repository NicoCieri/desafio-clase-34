import { Router } from "express";
import { optionalAuth } from "../middlewares/optionalAuth.js";
import * as controller from "../controllers/view.controller.js";
import requireAuth from "../middlewares/requireAuth.js";

const router = Router();

router.get("/products", optionalAuth, controller.productsView);
router.get("/cart/", optionalAuth, controller.cartView);
router.get("/register", controller.registerView);
router.get("/error-register", controller.errorRegisterView);
router.get("/login", controller.loginView);
router.get("/error-login", controller.errorLoginView);
// router.get("/profile", requireAuth, controller.profileView);

export default router;
