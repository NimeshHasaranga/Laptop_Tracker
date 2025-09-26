import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { getDashboard } from "../controllers/dashboardController.js";

const router = Router();

router.use(requireAuth);
router.get("/", getDashboard);

export default router;
