import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { getCurrent } from "../controllers/session.controller.js";

const router = Router();

router.get("/current", requireAuth, getCurrent);

export default router;
