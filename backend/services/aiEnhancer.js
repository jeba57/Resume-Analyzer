// ============================================================
// AI ENHANCER — uses OpenAI for bullet rewrites + verdict
// Falls back to local generated verdict if API fails
// Local ATS scores are NEVER affected by AI failure
// ============================================================

import OpenAI from "openai";

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const AI_PROMPT = (resumeText, localScores, jobDescription) => `
You are a senior technical recruiter. The resume has already been scored by a local ATS engine.
Local scores: ATS=${localScores.atsScore}%, Keywords=${localScores.keywordMatch}%, Technical=${localScores.technicalScore}%

Your job is ONLY to provide:
1. improvedBulletPoints: find 3 weak bullets and rewrite them with strong action verbs + quantified impact + ATS keywords
2. recruiterVerdict: 2-3 sentence honest recruiter assessment — would they shortlist? why?

Return ONLY valid raw JSON, no markdown, no backticks:
{
  "improvedBulletPoints": [
    { "original": "...", "improved": "...", "reason": "..." }
  ],
  "recruiterVerdict": "..."
}

JOB DESCRIPTION: ${jobDescription || "General software engineering role"}
RESUME: ${resumeText.substring(0, 3000)}
`;

export const enhanceWithAI = async (resumeText, localScores, jobDescription = "") => {
  // No API key configured — return local scores with generated verdict
  if (!client) {
    console.log("ℹ️  No OPENAI_API_KEY found — returning local scores only");
    return {
      ...localScores,
      recruiterVerdict: generateLocalVerdict(localScores),
    };
  }

  try {
    console.log("🤖 Calling OpenAI for AI enhancement...");

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a senior technical recruiter. Return only valid JSON as instructed.",
        },
        {
          role: "user",
          content: AI_PROMPT(resumeText, localScores, jobDescription),
        },
      ],
      max_tokens: 1000,
      temperature: 0.3,
    });

    const text = response.choices[0].message.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const ai = JSON.parse(text);
    console.log("✅ AI enhancement successful");

    return {
      ...localScores,
      improvedBulletPoints: ai.improvedBulletPoints || [],
      recruiterVerdict:     ai.recruiterVerdict     || generateLocalVerdict(localScores),
    };

  } catch (err) {
    // AI failed — local scores returned with auto-generated verdict
    console.log("⚠️  AI enhancement skipped:", err.message.substring(0, 100));
    return {
      ...localScores,
      recruiterVerdict: generateLocalVerdict(localScores),
    };
  }
};

// Generates professional recruiter verdict from local scores — no AI needed
const generateLocalVerdict = (scores) => {
  const s = scores.atsScore;
  if (s >= 75)
    return `This resume demonstrates strong ATS compatibility with a score of ${s}%. The candidate shows solid technical depth and good keyword alignment. With minor refinements to bullet points and quantified achievements, this resume would likely pass initial ATS screening for most software engineering roles.`;
  if (s >= 60)
    return `This resume scores ${s}% on ATS compatibility — a reasonable foundation but with notable gaps. Keyword density needs improvement and several bullet points lack measurable impact. The candidate should add more role-specific technologies and quantified results before applying to competitive positions.`;
  if (s >= 45)
    return `At ${s}% ATS score, this resume faces a significant risk of being filtered out before reaching a human recruiter. Key sections may be missing or poorly formatted, and technical keyword coverage is insufficient. A substantial rewrite focusing on ATS-friendly formatting and targeted keywords is recommended.`;
  return `This resume scores ${s}% — critically low for ATS systems. It will likely be rejected automatically before reaching any recruiter. The resume needs a complete restructure: single-column layout, clear section headers, strong action verbs, quantified achievements, and significantly more relevant technical keywords.`;
};
