import extractTextFromPDF from "../services/pdfService.js";

import analyzeResumeWithAI from "../services/geminiService.js";

export const uploadResume = async (req, res) => {
  try {
    const filePath = req.file.path;

    const extractedText =
      await extractTextFromPDF(filePath);

    const analysis =
  await analyzeResumeWithAI(
    extractedText
  );

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};