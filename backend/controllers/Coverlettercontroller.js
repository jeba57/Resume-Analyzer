import { GoogleGenerativeAI } from "@google/generative-ai";
import extractTextFromPDF from "../services/pdfService.js";
import CoverLetter from "../models/CoverLetter.js";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/cover-letter/generate
const generateCoverLetter = async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription || "";
    let resumeText = "";

    if (req.file) {
      resumeText = await extractTextFromPDF(req.file.path);
      fs.unlink(req.file.path, () => {});
    } else if (req.body.resumeText) {
      resumeText = req.body.resumeText;
    }

    if (!resumeText && !jobDescription)
      return res.status(400).json({ message: "Please provide a resume or job description." });

    const prompt = `
You are a professional career coach writing an A4-format cover letter.

Using the resume and job description provided, write a compelling, ATS-optimized professional cover letter.

RULES:
- Write in formal business English
- Maximum 4 paragraphs: Opening, Value Proposition, Relevant Experience, Closing CTA
- Naturally inject relevant keywords from the job description
- Do NOT use generic filler phrases like "I am excited to apply"
- Sound confident, specific, and results-oriented
- Keep it under 400 words (fits one A4 page)
- Do NOT include placeholders like [Company Name] — use the actual company from the JD if present, otherwise use "your organization"
- Return ONLY the cover letter text — no heading, no JSON, no markdown

JOB DESCRIPTION:
${jobDescription || "Software engineering / full-stack development role"}

RESUME:
${resumeText || "No resume provided — generate based on job description only"}
    `.trim();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    // Save to DB
    const letter = await CoverLetter.create({
      user: req.user._id,
      jobDescription,
      content,
    });

    return res.status(200).json({ success: true, content, letterId: letter._id });
  } catch (err) {
    console.error("Cover letter error:", err.message);
    return res.status(500).json({ message: "Cover letter generation failed. Please try again." });
  }
};

export { generateCoverLetter };