import User from "../models/User.js";
import Resume from "../models/Resume.js";
import CoverLetter from "../models/CoverLetter.js";

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (err) {
    console.error("Admin users error:", err.message);
    return res.status(500).json({ message: "Failed to fetch users." });
  }
};

// GET /api/admin/resumes
const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    return res.status(200).json(resumes);
  } catch (err) {
    console.error("Admin resumes error:", err.message);
    return res.status(500).json({ message: "Failed to fetch resumes." });
  }
};

// GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const totalUsers   = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();
    const totalLetters = await CoverLetter.countDocuments();
    const avgAts = await Resume.aggregate([
      { $group: { _id: null, avg: { $avg: "$analysis.atsScore" } } },
    ]);

    return res.status(200).json({
      totalUsers,
      totalResumes,
      totalLetters,
      avgAtsScore: Math.round(avgAts[0]?.avg || 0),
    });
  } catch (err) {
    console.error("Admin stats error:", err.message);
    return res.status(500).json({ message: "Failed to fetch stats." });
  }
};

// DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    if (user.isAdmin) return res.status(400).json({ message: "Cannot delete admin user." });
    await User.findByIdAndDelete(req.params.id);
    await Resume.deleteMany({ user: req.params.id });
    return res.status(200).json({ message: "User deleted." });
  } catch (err) {
    console.error("Delete user error:", err.message);
    return res.status(500).json({ message: "Failed to delete user." });
  }
};

export { getAllUsers, getAllResumes, getStats, deleteUser };