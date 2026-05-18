import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import atsPrompt from "../utils/atsPrompt.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeResumeWithAI = async (
  resumeText,
  jobDescription = ""
) => {
  try {
    const prompt = atsPrompt(
      resumeText,
      jobDescription
    );

    console.log("Calling OpenAI...");

    const response =
      await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

    const text =
      response.choices[0].message.content;
console.log(text);
    console.log("OpenAI responded");

    const d = JSON.parse(
      text.replace(/```json/g, "")
          .replace(/```/g, "")
          .trim()
    );

    console.log("ATS Score:", d.atsScore);

    return {
      atsScore: d.atsScore ?? 0,
      keywordMatch: d.keywordMatch ?? 0,
      formattingScore: d.formattingScore ?? 0,
      readabilityScore: d.readabilityScore ?? 0,
      technicalScore: d.technicalScore ?? 0,
      recruiterConfidence:
        d.recruiterConfidence ?? 0,
      scoreTitle:
        d.scoreTitle || "Analysis complete",
      strengths: d.strengths || [],
      weaknesses: d.weaknesses || [],
      missingKeywords:
        d.missingKeywords || [],
      matchedSkills:
        d.matchedSkills || [],
      missingCriticalSkills:
        d.missingCriticalSkills || [],
      formattingIssues:
        d.formattingIssues || [],
      suggestions:
        d.suggestions || [],
      improvedBulletPoints:
        d.improvedBulletPoints || [],
      recruiterVerdict:
        d.recruiterVerdict || "",
    };

  } catch (error) {
    console.error(
      "OPENAI FAILED:",
      error.message
    );

    return {
      atsScore: 0,
      keywordMatch: 0,
      formattingScore: 0,
      readabilityScore: 0,
      technicalScore: 0,
      recruiterConfidence: 0,
      scoreTitle:
        "Analysis failed — please retry",
      strengths: [],
      weaknesses: [],
      missingKeywords: [],
      matchedSkills: [],
      missingCriticalSkills: [],
      formattingIssues: [],
      suggestions: [],
      improvedBulletPoints: [],
      recruiterVerdict:
        "AI analysis failed. Please try again.",
    };
  }
};

export default analyzeResumeWithAI;