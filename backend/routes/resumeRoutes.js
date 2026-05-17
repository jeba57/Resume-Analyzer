
import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  registerUser,
  loginUser,
  updateProfile,
} from "../controllers/userController.js";

import {
  uploadResume,
  getHistory,
  getResumeById,
} from "../controllers/resumeController.js";

import {
  generateCoverLetter,
} from "../controllers/coverLetterController.js";

import {
  getAllUsers,
  getAllResumes,
  getStats,
  deleteUser,
} from "../controllers/adminController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// ============================================================
// USER ROUTES
// ============================================================

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put(
  "/profile",
  protect,
  upload.single("profilePicture"),
  updateProfile
);


// ============================================================
// RESUME ROUTES
// ============================================================

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/history",
  protect,
  getHistory
);

router.get(
  "/history/:id",
  protect,
  getResumeById
);


// ============================================================
// COVER LETTER ROUTES
// ============================================================

router.post(
  "/generate",
  protect,
  upload.single("resume"),
  generateCoverLetter
);


// ============================================================
// ADMIN ROUTES
// ============================================================

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

router.get(
  "/resumes",
  protect,
  adminOnly,
  getAllResumes
);

router.get(
  "/stats",
  protect,
  adminOnly,
  getStats
);

router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

export default router;
