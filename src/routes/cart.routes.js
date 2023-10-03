import { Router } from "express";
import * as controller from "../controllers/cart.controller.js";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.post(
  "/:id/product/:productId",
  requireAuth,
  authorize(["user"]),
  controller.addProductToCart
);
router.delete(
  "/:id/product/:productId",
  requireAuth,
  authorize(["user"]),
  controller.removeProductFromCart
);
router.put(
  "/:id",
  requireAuth,
  authorize(["user"]),
  controller.updateCartItems
);
router.put(
  "/:id/product/:productId",
  requireAuth,
  authorize(["user"]),
  controller.updateProductQuantity
);
router.delete(
  "/:id",
  requireAuth,
  authorize(["user"]),
  controller.removeProducts
);
router.post(
  "/:id/purchase",
  requireAuth,
  authorize(["user"]),
  controller.purchaseCart
);

export default router;
