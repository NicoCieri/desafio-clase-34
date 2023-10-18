import { Router } from "express";

import * as logger from "../controllers/logger.controller.js";

const router = Router();

router.get("/loggerTest", logger.loggerTest);

export default router;
