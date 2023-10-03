import { Router } from "express";
import * as controller from "../controllers/product.controller.js";
import { uploader } from "../middlewares/multer.js";
import validateProduct from "../middlewares/validateProductFields.js";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/mockingproducts", controller.getProductsMock);
router.get("/:id", controller.getById);
router.post(
  "/",
  requireAuth,
  authorize(["admin"]),
  uploader.single("thumbnail"),
  validateProduct,
  controller.create
);
router.put(
  "/:id",
  requireAuth,
  authorize(["admin"]),
  uploader.single("thumbnail"),
  validateProduct,
  controller.update
);
router.delete("/:id", requireAuth, authorize(["admin"]), controller.remove);

export default router;
