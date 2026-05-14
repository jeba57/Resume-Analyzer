import extractTextFromPDF from "../services/pdfService.js";
import analyzeResumeWithAI from "../services/geminiService.js";

const uploadResume = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded",
      });

    }

    const resumeText =
      await extractTextFromPDF(
        req.file.path
      );

    const jobDescription =
  req.body.jobDescription || "";

const analysis =
  await analyzeResumeWithAI(
    resumeText,
    jobDescription
  );

    return res.status(200).json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message:
        "Resume analysis failed",
    });

  }
};

export {
  uploadResume,
};