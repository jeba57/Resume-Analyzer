import { GoogleGenerativeAI } from "@google/generative-ai";
import atsPrompt from "../utils/atsPrompt.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const analyzeResumeWithAI = async (resumeText, jobDescription = "") => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = atsPrompt(resumeText, jobDescription);
    const result = await model.generateContent(prompt);
    const text = result.response.text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const d = JSON.parse(text);

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
  } catch (err) {
    //console.error("Gemini error:", err.message);
    
     console.error("FULL GEMINI ERROR:");
      console.error(err);


    return {
      atsScore: 0, keywordMatch: 0, formattingScore: 0,
      readabilityScore: 0, technicalScore: 0, recruiterConfidence: 0,
      scoreTitle: "Analysis failed — please retry",
      strengths: [], weaknesses: [], missingKeywords: [], matchedSkills: [],
      missingCriticalSkills: [], formattingIssues: [], suggestions: [],
      improvedBulletPoints: [],
      recruiterVerdict: "AI analysis encountered an error. Please re-upload your resume.",
    };
  }
};

export default analyzeResumeWithAI;