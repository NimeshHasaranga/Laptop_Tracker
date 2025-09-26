import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { writeAudit } from "../utils/auditLogger.js";

const genToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "8h" });

export const login = async (req, res) => {
  const { username, taNumber } = req.body || {};
  if (!username || !taNumber) return res.status(400).json({ message: "username & TA required" });

  const user = await User.findOne({ username, isActive: true });
  if (!user || !(await user.matchTA(taNumber))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  user.lastLoginAt = new Date();
  await user.save();

  await writeAudit({ entity: "user", entityId: user._id, action: "login", changedBy: user._id });

  res.json({
    token: genToken(user._id, user.role),
    role: user.role,
    username: user.username
  });
};
