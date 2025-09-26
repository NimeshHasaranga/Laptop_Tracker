import { Router } from "express";
import { createUser, listUsers, updateUser } from "../controllers/userController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth, requireAdmin);
router.get("/", listUsers);
router.post("/", createUser);
router.patch("/:id", updateUser);

export default router;
