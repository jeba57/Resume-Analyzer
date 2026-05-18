import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { generateCoverLetter } from "../controllers/Coverlettercontroller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, upload.single("resume"), generateCoverLetter);

export default router;