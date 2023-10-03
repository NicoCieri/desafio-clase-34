import { Router } from "express";
import productRouter from "./product.routes.js";
import cartRouter from "./cart.routes.js";
import viewsRouter from "./views.routes.js";
import userRouter from "./user.routes.js";
import ticketRouter from "./ticket.routes.js";
import sessionRouter from "./session.routes.js";

const router = Router();

router.use("/api/products", productRouter);
router.use("/api/carts", cartRouter);
router.use("/api/sessions", sessionRouter);
router.use("/api/users", userRouter);
router.use("/api/tickets", ticketRouter);
router.use("/", viewsRouter);

export default router;
