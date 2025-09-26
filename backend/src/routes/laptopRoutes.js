import { Router } from "express";
import {
  createLaptop,
  listLaptops,
  getLaptop,
  updateLaptop,
  deleteLaptop
} from "../controllers/laptopController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth);
router.get("/", listLaptops);
router.post("/", createLaptop);
router.get("/:id", getLaptop);
router.patch("/:id", updateLaptop);
router.delete("/:id", requireAdmin, deleteLaptop);

export default router;
