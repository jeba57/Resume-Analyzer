import extractTextFromPDF from "../services/pdfService.js";
import analyzeResumeWithAI from "../services/geminiService.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// POST /api/resume/upload
const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded." });

    const resumeText = await extractTextFromPDF(req.file.path);

    if (!resumeText || resumeText.trim().length < 50) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({
        message: "Could not extract text from the PDF. Please ensure it is a text-based PDF.",
      });
    }

    const jobDescription = req.body.jobDescription || "";
    const analysis = await analyzeResumeWithAI(resumeText, jobDescription);

    // Save to history
    const resume = await Resume.create({
      user: req.user._id,
      filename: req.file.originalname,
      jobDescription,
      analysis,
    });

    // Clean up uploaded file
    fs.unlink(req.file.path, () => {});

    return res.status(200).json({ success: true, analysis, resumeId: resume._id });
  } catch (err) {
    console.error("Resume upload error:", err.message);
    return res.status(500).json({ message: "Resume analysis failed. Please try again." });
  }
};

// GET /api/resume/history
const getHistory = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("filename analysis.atsScore analysis.scoreTitle jobDescription createdAt");
    return res.status(200).json(resumes);
  } catch (err) {
    console.error("History error:", err.message);
    return res.status(500).json({ message: "Failed to fetch history." });
  }
};

// GET /api/resume/history/:id
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!resume) return res.status(404).json({ message: "Resume not found." });
    return res.status(200).json(resume);
  } catch (err) {
    console.error("Get resume error:", err.message);
    return res.status(500).json({ message: "Failed to fetch resume." });
  }
};

export { uploadResume, getHistory, getResumeById };