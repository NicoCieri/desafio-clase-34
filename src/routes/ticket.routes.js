import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";

const controller = new TicketController();

const router = Router();

router.get("/", requireAuth, authorize(["admin"]), controller.getAll);
router.get("/:id", requireAuth, authorize(["admin"]), controller.getById);

export default router;
