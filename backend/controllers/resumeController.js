import extractTextFromPDF from "../services/pdfService.js";
import { scoreResume }    from "../services/atsEngine.js";
import { enhanceWithAI }  from "../services/aiEnhancer.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// POST /api/resume/upload
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const resumeText = await extractTextFromPDF(req.file.path);
    fs.unlink(req.file.path, () => {});

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        message: "Could not extract text from this PDF. Please use a text-based PDF.",
      });
    }

    const jobDescription = req.body.jobDescription || "";

    console.log("📊 Running local ATS engine...");
    const localScores = scoreResume(resumeText, jobDescription);
    console.log("✅ Local ATS Score:", localScores.atsScore);

    const analysis = await enhanceWithAI(resumeText, localScores, jobDescription);

    const resume = await Resume.create({
      user:     req.user._id,
      filename: req.file.originalname || "resume.pdf",
      jobDescription,
      analysis,
    });

    return res.status(200).json({ success: true, analysis, resumeId: resume._id });

  } catch (error) {
    console.error("Resume upload error:", error.message);
    return res.status(500).json({ message: "Resume analysis failed. Please try again." });
  }
};

// GET /api/resume/history
const getHistory = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("filename analysis.atsScore analysis.scoreTitle analysis.keywordMatch analysis.strengths analysis.missingKeywords createdAt");
    return res.status(200).json(resumes);
  } catch (error) {
    console.error("History error:", error.message);
    return res.status(500).json({ message: "Failed to fetch history." });
  }
};

// GET /api/resume/history/:id
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!resume) return res.status(404).json({ message: "Resume not found." });
    return res.status(200).json(resume);
  } catch (error) {
    console.error("Get resume error:", error.message);
    return res.status(500).json({ message: "Failed to fetch resume." });
  }
};

// DELETE /api/resume/history/:id
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!resume) return res.status(404).json({ message: "Resume not found." });
    await Resume.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Resume deleted." });
  } catch (error) {
    console.error("Delete resume error:", error.message);
    return res.status(500).json({ message: "Failed to delete resume." });
  }
};

export { uploadResume, getHistory, getResumeById, deleteResume };