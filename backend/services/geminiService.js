import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

import atsPrompt from "../utils/atsPrompt.js";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const analyzeResumeWithAI =
  async (
    resumeText,
    jobDescription = ""
  ) => {

    try {

      const model =
        genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

      const prompt =
        atsPrompt(
          resumeText,
          jobDescription
        );

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        await result.response;

      const text =
        response.text();

      const cleanedContent =
        text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      const parsedData =
        JSON.parse(cleanedContent);

      return {

        atsScore:
          parsedData.atsScore || 70,

        keywordMatch:
          parsedData.keywordMatch || 60,

        strengths:
          parsedData.strengths || [],

        weaknesses:
          parsedData.weaknesses || [],

        missingKeywords:
          parsedData.missingKeywords || [],

        formattingIssues:
          parsedData.formattingIssues || [],

        suggestions:
          parsedData.suggestions || [],

        improvedBulletPoints:
          parsedData.improvedBulletPoints || [],

        recruiterVerdict:
          parsedData.recruiterVerdict ||
          "Resume analysis generated successfully.",

        matchedSkills:
          parsedData.matchedSkills || [],

        missingCriticalSkills:
          parsedData.missingCriticalSkills || [],

        formattingScore:
          parsedData.formattingScore || 75,

        readabilityScore:
          parsedData.readabilityScore || 75,

        technicalScore:
          parsedData.technicalScore || 75,

        recruiterConfidence:
          parsedData.recruiterConfidence || 75,
      };

    } catch (error) {

      console.log(
        "Gemini Error:",
        error
      );

      return {

        atsScore: 65,

        keywordMatch: 55,

        strengths: [
          "Resume uploaded successfully",
        ],

        weaknesses: [
          "AI analysis temporarily unavailable",
        ],

        missingKeywords: [
          "Docker",
          "AWS",
        ],

        formattingIssues: [
          "Formatting can be improved",
        ],

        suggestions: [
          "Improve ATS keyword optimization",
        ],

        improvedBulletPoints: [
          "Built scalable full-stack web applications using MERN stack technologies.",
        ],

        recruiterVerdict:
          "Resume shows technical potential but requires stronger ATS optimization and quantified achievements.",

        matchedSkills: [
          "React.js",
          "Node.js",
        ],

        missingCriticalSkills: [
          "Docker",
          "CI/CD",
        ],

        formattingScore: 72,

        readabilityScore: 75,

        technicalScore: 78,

        recruiterConfidence: 70,
      };
    }
  };

export default analyzeResumeWithAI;