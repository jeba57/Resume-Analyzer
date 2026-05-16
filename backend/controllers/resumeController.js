import extractTextFromPDF from "../services/pdfService.js";
import analyzeResumeWithAI from "../services/geminiService.js";

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resumeText = await extractTextFromPDF(req.file.path);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        message: "Could not extract text from the uploaded PDF. Please ensure it is a text-based PDF, not a scanned image.",
      });
    }

    const jobDescription = req.body.jobDescription || "";

    const analysis = await analyzeResumeWithAI(resumeText, jobDescription);

    return res.status(200).json({ success: true, analysis });

  } catch (error) {
    console.error("Resume analysis error:", error.message);
    return res.status(500).json({ message: "Resume analysis failed. Please try again." });
  }
};

export { uploadResume };