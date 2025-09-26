import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import laptopRoutes from "./src/routes/laptopRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import { errorHandler, notFound } from "./src/middleware/errorHandler.js";
import { ensureInitialAdmin } from "./src/utils/ensureAdmin.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));

await connectDB();
await ensureInitialAdmin();

app.get("/", (req, res) => res.send("Laptop Tracker API running"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/laptops", laptopRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
