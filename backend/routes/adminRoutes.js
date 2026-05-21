import express from "express";

import {
  getAllUsers,
  getAllResumes,
  getStats,
  deleteUser,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin routes
router.get("/stats", protect, getStats);

router.get("/users", protect, getAllUsers);

router.get("/resumes", protect, getAllResumes);

router.delete("/users/:id", protect, deleteUser);

export default router;