import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post(
  "/profile-picture",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No image uploaded",
        });
      }
     //console.log("REQ FILE:", req.file);
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "profile_pictures",
        }
      );

      const user = await User.findById(req.user._id);

      user.profilePicture = result.secure_url;

      await user.save();

      res.json({
        message: "Profile picture updated",
        profilePicture: result.secure_url,
      });

    } catch (error) {
  console.log("FULL ERROR:", error);

  return res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}
  }
);

export default router;