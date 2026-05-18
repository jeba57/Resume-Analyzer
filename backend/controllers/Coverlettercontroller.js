import OpenAI from "openai";
import extractTextFromPDF from "../services/pdfService.js";
import CoverLetter from "../models/CoverLetter.js";
import fs from "fs";

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// ── LOCAL COVER LETTER GENERATOR ─────────────────────────────
// Extracts name, skills, experience from resume text
// Generates a professional A4 cover letter with no API needed

const extractName = (text) => {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  // First non-empty line is usually the name
  const first = lines[0] || "";
  if (first.length < 40 && /^[A-Za-z\s.'-]+$/.test(first)) return first;
  return "the candidate";
};

const extractEmail = (text) => {
  const match = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  return match ? match[0] : "";
};

const extractTopSkills = (text) => {
  const SKILLS = [
    "React","Node.js","Python","JavaScript","TypeScript","MongoDB","PostgreSQL",
    "Express","Django","AWS","Docker","Git","REST API","GraphQL","Vue","Angular",
    "Java","Spring","MySQL","Redis","Kubernetes","CI/CD","Next.js","FastAPI",
    "Machine Learning","TensorFlow","PyTorch","Flutter","Swift","Kotlin",
  ];
  return SKILLS.filter((s) => text.toLowerCase().includes(s.toLowerCase())).slice(0, 6);
};

const extractRole = (jd) => {
  if (!jd) return "Software Engineer";
  const match = jd.match(
    /(senior |junior |lead |full.?stack |frontend |backend |software |web |mobile )?developer|engineer|architect|analyst|designer/i
  );
  return match ? match[0].trim() : "Software Engineer";
};

const extractCompany = (jd) => {
  if (!jd) return "your organization";
  const match = jd.match(/at\s+([A-Z][A-Za-z0-9\s&.,]+?)[\s,.]*(is|are|we|our|\n)/);
  return match ? match[1].trim() : "your organization";
};

const generateLocalCoverLetter = (resumeText, jobDescription) => {
  const name    = extractName(resumeText);
  const email   = extractEmail(resumeText);
  const skills  = extractTopSkills(resumeText);
  const role    = extractRole(jobDescription);
  const company = extractCompany(jobDescription);
  const date    = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const skillLine = skills.length
    ? `My core technical skills include ${skills.slice(0, 4).join(", ")}${skills.length > 4 ? `, and ${skills[4]}` : ""}, which directly align with the requirements outlined in your job description.`
    : "I bring a strong technical background and hands-on experience building production-grade applications.";

  return `${date}

Hiring Manager
${company}

Dear Hiring Manager,

I am writing to express my strong interest in the ${role} position at ${company}. With my background in software development and a proven track record of building reliable, scalable applications, I am confident in my ability to make an immediate and meaningful contribution to your team.

${skillLine} Throughout my career, I have consistently delivered high-quality software solutions that solve real business problems. I take pride in writing clean, maintainable code and collaborating effectively with cross-functional teams to meet project goals on time.

What particularly excites me about this opportunity is the chance to work on challenging technical problems in a collaborative environment. I am highly motivated to continue growing as an engineer and to contribute to ${company}'s mission. My experience with modern development practices, including agile methodologies, code review, and continuous integration, has prepared me well for a fast-paced engineering team.

I would welcome the opportunity to discuss how my skills and experience align with your needs. Thank you for considering my application — I look forward to the possibility of contributing to your team.

Sincerely,
${name}${email ? `\n${email}` : ""}`;
};

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

    if (!resumeText && !jobDescription) {
      return res.status(400).json({ message: "Please provide a resume or job description." });
    }

    let content = "";

    // Try OpenAI first
    if (client) {
      try {
        console.log("🤖 Generating cover letter with OpenAI...");
        const response = await client.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a professional career coach. Write formal, ATS-optimized cover letters. Return only the cover letter text — no subject lines, no markdown, no commentary.",
            },
            {
              role: "user",
              content: `Write a professional A4 cover letter (under 400 words, 4 paragraphs).
Rules:
- Formal business tone
- Inject keywords from the job description naturally
- No generic phrases like "I am excited to apply"
- Sound confident and results-oriented
- No placeholders like [Company Name]

JOB DESCRIPTION: ${jobDescription || "Software engineering role"}
RESUME: ${resumeText || ""}`,
            },
          ],
          max_tokens: 800,
          temperature: 0.4,
        });
        content = response.choices[0].message.content.trim();
        console.log("OpenAI cover letter generated");
      } catch (aiErr) {
        console.log("OpenAI failed:", aiErr.message.substring(0, 80));
        console.log("Falling back to local generator...");
        content = generateLocalCoverLetter(resumeText, jobDescription);
      }
    } else {
      // No API key — use local generator
      console.log("Generating cover letter locally (no API key)...");
      content = generateLocalCoverLetter(resumeText, jobDescription);
    }

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