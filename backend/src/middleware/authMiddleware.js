import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).lean();
    if (!user || !user.isActive) return res.status(401).json({ message: "Invalid user" });

    req.user = { id: user._id, role: user.role, username: user.username };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") return res.status(403).json({ message: "Admin only" });
  next();
};
