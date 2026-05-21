import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadResume, getHistory, getResumeById, deleteResume } from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload",        protect, upload.single("resume"), uploadResume);
router.get("/history",        protect, getHistory);
router.get("/history/:id",    protect, getResumeById);
router.delete("/history/:id", protect, deleteResume);

export default router;