import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";



import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import coverLetterRoutes from "./routes/xyz.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config(); //  standard dotenv — never prints API key

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

connectDB();

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth",         authRoutes);
app.use("/api/resume",       resumeRoutes);
app.use("/api/cover-letter", coverLetterRoutes);
app.use("/api/admin",        adminRoutes);

app.get("/", (req, res) => res.json({ message: "Resume Analyzer API running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));