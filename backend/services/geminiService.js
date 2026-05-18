import { GoogleGenerativeAI } from "@google/generative-ai";
import atsPrompt from "../utils/atsPrompt.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ gemini-2.0-flash — confirmed available for this account
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const analyzeResumeWithAI = async (resumeText, jobDescription = "") => {
  try {
    const prompt = atsPrompt(resumeText, jobDescription);

    console.log("🔄 Calling Gemini (gemini-2.0-flash)...");

    const result = await model.generateContent(prompt);

    // ✅ Fixed: removed broken `await result.response` — it is NOT a Promise
    const text = result.response.text();

    console.log("✅ Gemini responded, parsing JSON...");

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const d = JSON.parse(cleaned);

    console.log("✅ ATS Score:", d.atsScore);

    return {
      atsScore:              d.atsScore              ?? 0,
      keywordMatch:          d.keywordMatch          ?? 0,
      formattingScore:       d.formattingScore       ?? 0,
      readabilityScore:      d.readabilityScore      ?? 0,
      technicalScore:        d.technicalScore        ?? 0,
      recruiterConfidence:   d.recruiterConfidence   ?? 0,
      scoreTitle:            d.scoreTitle            || "Analysis complete",
      strengths:             d.strengths             || [],
      weaknesses:            d.weaknesses            || [],
      missingKeywords:       d.missingKeywords       || [],
      matchedSkills:         d.matchedSkills         || [],
      missingCriticalSkills: d.missingCriticalSkills || [],
      formattingIssues:      d.formattingIssues      || [],
      suggestions:           d.suggestions           || [],
      improvedBulletPoints:  d.improvedBulletPoints  || [],
      recruiterVerdict:      d.recruiterVerdict      || "",
    };

  } catch (error) {
    console.error("\n❌ GEMINI FAILED:", error.message, "\n");

    // ✅ Fixed: return real zeros — NOT fake scores
    return {
      atsScore: 0, keywordMatch: 0, formattingScore: 0,
      readabilityScore: 0, technicalScore: 0, recruiterConfidence: 0,
      scoreTitle: "Analysis failed — please retry",
      strengths: [], weaknesses: [], missingKeywords: [], matchedSkills: [],
      missingCriticalSkills: [], formattingIssues: [], suggestions: [],
      improvedBulletPoints: [],
      recruiterVerdict: "AI analysis failed. Please try again.",
    };
  }
};

export default analyzeResumeWithAI;