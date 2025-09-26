import User from "../models/User.js";
import { writeAudit } from "../utils/auditLogger.js";

export const createUser = async (req, res) => {
  const { username, taNumber, role = "staff" } = req.body || {};
  if (!username || !taNumber) return res.status(400).json({ message: "username & TA required" });

  const exists = await User.findOne({ username });
  if (exists) return res.status(409).json({ message: "Username already exists" });

  const user = new User({ username, taNumber, role, isActive: true });
  await user.save();

  await writeAudit({ entity: "user", entityId: user._id, action: "create", changedBy: req.user.id });

  res.status(201).json({ id: user._id, username: user.username, role: user.role, isActive: user.isActive });
};

export const listUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).select("_id username role isActive lastLoginAt createdAt");
  res.json(users);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { isActive, role } = req.body || {};
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const before = user.toObject();
  if (typeof isActive === "boolean") user.isActive = isActive;
  if (role && ["admin", "staff"].includes(role)) user.role = role;
  await user.save();
  const after = user.toObject();

  await writeAudit({
    entity: "user",
    entityId: user._id,
    action: "update",
    changedBy: req.user.id,
    diff: Object.keys(after)
      .filter(k => JSON.stringify(before[k]) !== JSON.stringify(after[k]))
      .map(k => ({ path: k, from: before[k], to: after[k] }))
  });

  res.json({ id: user._id, username: user.username, role: user.role, isActive: user.isActive });
};
