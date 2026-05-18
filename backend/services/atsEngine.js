// ============================================================
// LOCAL ATS ENGINE — 100% deterministic, zero AI dependency
// Scores resume text across 6 dimensions
// ============================================================

// ── KEYWORD BANKS ────────────────────────────────────────────
const TECH_KEYWORDS = [
  // Languages
  "javascript","typescript","python","java","c++","c#","go","rust","swift","kotlin","php","ruby","scala",
  // Frontend
  "react","vue","angular","next.js","nuxt","tailwind","css","html","sass","redux","zustand","webpack","vite",
  // Backend
  "node.js","express","django","flask","fastapi","spring","laravel","rails","graphql","rest","api",
  // Databases
  "mongodb","postgresql","mysql","redis","firebase","supabase","prisma","mongoose","sql","nosql",
  // Cloud/DevOps
  "aws","azure","gcp","docker","kubernetes","ci/cd","github actions","terraform","nginx","linux",
  // Tools
  "git","github","jira","figma","postman","jest","cypress","webpack","babel","eslint",
  // Concepts
  "microservices","agile","scrum","tdd","oop","mvc","jwt","oauth","rest api","websocket",
];

const SOFT_KEYWORDS = [
  "collaborated","led","managed","built","developed","designed","implemented","optimized",
  "improved","increased","reduced","delivered","deployed","architected","mentored","launched",
];

const REQUIRED_SECTIONS = [
  "experience", "education", "skills", "projects",
  "summary", "objective", "contact", "certifications",
];

const WEAK_VERBS = [
  "worked on","helped with","assisted","was responsible for","participated in",
  "involved in","contributed to","did","made","used",
];

const STRONG_VERBS = [
  "built","developed","architected","led","launched","optimized","reduced","increased",
  "delivered","designed","implemented","automated","migrated","deployed","scaled",
];

// ── HELPERS ──────────────────────────────────────────────────
const lower = (t) => t.toLowerCase();

const countMatches = (text, keywords) =>
  keywords.filter((k) => lower(text).includes(lower(k)));

const extractBullets = (text) =>
  text.split("\n").filter((l) => l.trim().match(/^[•\-\*▪➤>]/));

const hasQuantifiedResults = (text) =>
  (text.match(/\d+%|\$\d+|\d+x|\d+\+|\d+ (users|customers|clients|requests|ms|seconds|hours|days|projects|features|teams|engineers)/gi) || []);

const detectSections = (text) =>
  REQUIRED_SECTIONS.filter((s) => lower(text).includes(s));

const wordCount = (text) => text.split(/\s+/).filter(Boolean).length;

// ── MAIN SCORING FUNCTION ────────────────────────────────────
export const scoreResume = (resumeText, jobDescription = "") => {
  const text    = resumeText || "";
  const jdText  = jobDescription || "";
  const words   = wordCount(text);

  // ── 1. KEYWORD MATCH (0–100) ──────────────────────────────
  const matchedTech    = countMatches(text, TECH_KEYWORDS);
  const jdWords        = jdText
    ? jdText.toLowerCase().split(/\W+/).filter((w) => w.length > 3)
    : [];
  const jdMatches      = jdWords.length
    ? jdWords.filter((w) => lower(text).includes(w))
    : matchedTech;
  const keywordMatch   = jdWords.length
    ? Math.min(100, Math.round((jdMatches.length / Math.min(jdWords.length, 40)) * 100))
    : Math.min(100, matchedTech.length * 5);

  // ── 2. FORMATTING SCORE (0–100) ───────────────────────────
  let formattingScore = 100;
  const lines = text.split("\n");
  const avgLineLen = lines.reduce((a, l) => a + l.length, 0) / (lines.length || 1);
  if (avgLineLen > 120)          formattingScore -= 20; // very long lines = table layout
  if (text.includes("\t\t\t"))   formattingScore -= 15; // excessive tabs = columns
  if (lines.length < 20)         formattingScore -= 20; // too short
  if (words < 150)               formattingScore -= 20; // under 150 words
  if (words > 1200)              formattingScore -= 10; // over-stuffed
  const sections = detectSections(text);
  formattingScore -= Math.max(0, (4 - sections.length) * 8); // missing key sections
  formattingScore = Math.max(0, Math.min(100, formattingScore));

  // ── 3. READABILITY SCORE (0–100) ──────────────────────────
  let readabilityScore = 60;
  const bullets        = extractBullets(text);
  const strongCount    = countMatches(text, STRONG_VERBS).length;
  const weakCount      = countMatches(text, WEAK_VERBS).length;
  const quantified     = hasQuantifiedResults(text);

  readabilityScore += Math.min(20, bullets.length * 2);       // bullet points
  readabilityScore += Math.min(10, strongCount * 2);          // strong verbs
  readabilityScore -= Math.min(15, weakCount  * 3);           // weak verbs
  readabilityScore += Math.min(10, quantified.length * 2);    // metrics
  readabilityScore  = Math.max(0, Math.min(100, readabilityScore));

  // ── 4. TECHNICAL SCORE (0–100) ────────────────────────────
  const techMatched    = countMatches(text, TECH_KEYWORDS);
  const technicalScore = Math.min(100, techMatched.length * 4);

  // ── 5. ATS SCORE — weighted composite ────────────────────
  const atsScore = Math.round(
    keywordMatch    * 0.35 +
    formattingScore * 0.20 +
    readabilityScore* 0.20 +
    technicalScore  * 0.25
  );

  // ── 6. RECRUITER CONFIDENCE ────────────────────────────────
  const hasContact  = /\b[\w.-]+@[\w.-]+\.\w+\b/.test(text); // email
  const hasPhone    = /(\+?\d[\d\s\-().]{7,}\d)/.test(text); // phone
  const hasLinkedIn = lower(text).includes("linkedin");
  const hasGithub   = lower(text).includes("github");
  let recruiterConf = atsScore;
  if (hasContact)  recruiterConf += 5;
  if (hasPhone)    recruiterConf += 3;
  if (hasLinkedIn) recruiterConf += 4;
  if (hasGithub)   recruiterConf += 3;
  recruiterConf     = Math.max(0, Math.min(100, Math.round(recruiterConf)));

  // ── STRENGTHS ────────────────────────────────────────────
  const strengths = [];
  if (techMatched.length >= 8)
    strengths.push(`Strong technical keyword coverage — ${techMatched.length} tech skills detected including ${techMatched.slice(0, 4).join(", ")}.`);
  if (bullets.length >= 5)
    strengths.push(`Good use of bullet points (${bullets.length} found) — improves ATS parsing and recruiter scan speed.`);
  if (quantified.length >= 3)
    strengths.push(`Resume contains ${quantified.length} quantified achievements — metrics significantly boost recruiter confidence.`);
  if (sections.length >= 5)
    strengths.push(`All major resume sections detected: ${sections.join(", ")}.`);
  if (strongCount >= 5)
    strengths.push(`Strong action verbs used (${strongCount} detected) — improves readability and impact.`);
  if (hasLinkedIn && hasGithub)
    strengths.push("LinkedIn and GitHub profiles included — essential for tech roles and recruiter verification.");
  if (strengths.length === 0)
    strengths.push("Resume parsed successfully. Add more keywords and quantified results to improve your score.");

  // ── WEAKNESSES ───────────────────────────────────────────
  const weaknesses = [];
  if (keywordMatch < 50)
    weaknesses.push(`Low keyword match (${keywordMatch}%) — add more role-specific technologies and tools from the job description.`);
  if (weakCount >= 3)
    weaknesses.push(`${weakCount} weak action verbs detected (e.g. "worked on", "helped with") — replace with strong verbs like "built", "led", "optimized".`);
  if (quantified.length < 2)
    weaknesses.push("Fewer than 2 quantified achievements found — add metrics like percentages, user counts, or performance improvements.");
  if (bullets.length < 4)
    weaknesses.push("Too few bullet points — use bullet format for experience descriptions to improve ATS parsing.");
  if (!hasContact)
    weaknesses.push("No email address detected — ensure contact information is in plain text, not an image or text box.");
  if (words < 200)
    weaknesses.push(`Resume appears too short (${words} words) — aim for 400–700 words for a single-page resume.`);
  if (sections.length < 4)
    weaknesses.push(`Missing key sections — only ${sections.length} of 4+ required sections detected. Add Experience, Education, Skills, and Projects.`);

  // ── FORMATTING ISSUES ────────────────────────────────────
  const formattingIssues = [];
  if (avgLineLen > 120)
    formattingIssues.push("Multi-column or table layout detected — ATS parsers read left-to-right and may merge unrelated content from columns.");
  if (text.includes("\t\t\t"))
    formattingIssues.push("Excessive tab characters suggest a table or column layout — replace with single-column plain text format.");
  if (words < 150)
    formattingIssues.push("Very little text extracted — your PDF may use embedded images or scanned text that ATS cannot read.");
  if (!hasContact)
    formattingIssues.push("Contact details not found in plain text — placing email/phone in a header text box makes it invisible to ATS.");

  // ── MISSING KEYWORDS ─────────────────────────────────────
  const allExpected = jdWords.length
    ? jdWords.filter((w) => w.length > 3 && !lower(text).includes(w)).slice(0, 12)
    : TECH_KEYWORDS.filter((k) => !lower(text).includes(k)).slice(0, 12);

  const missingKeywords      = allExpected.slice(0, 8);
  const missingCriticalSkills= allExpected.slice(0, 4);

  // ── MATCHED SKILLS ───────────────────────────────────────
  const matchedSkills = techMatched.slice(0, 15);

  // ── SCORE TITLE ──────────────────────────────────────────
  let scoreTitle;
  if (atsScore >= 80)      scoreTitle = "Excellent ATS compatibility";
  else if (atsScore >= 70) scoreTitle = "Strong candidate, minor gaps";
  else if (atsScore >= 60) scoreTitle = "Good foundation, needs keywords";
  else if (atsScore >= 50) scoreTitle = "Moderate match, improvements needed";
  else if (atsScore >= 40) scoreTitle = "Weak ATS match, major gaps";
  else                     scoreTitle = "Low compatibility, significant rework needed";

  // ── SUGGESTIONS (always generated, no AI needed) ─────────
  const suggestions = [];
  if (missingKeywords.length)
    suggestions.push(`Add these missing keywords naturally to your resume: ${missingKeywords.slice(0, 5).join(", ")} — these appear in most job descriptions for this role.`);
  if (weakCount > 0)
    suggestions.push(`Replace weak verbs like "worked on" and "helped with" with strong action verbs: built, developed, architected, optimized, delivered.`);
  if (quantified.length < 3)
    suggestions.push("Add quantified results to at least 3 bullet points — e.g. 'Reduced load time by 40%' or 'Served 10,000+ daily users'.");
  if (!hasLinkedIn)
    suggestions.push("Add your LinkedIn profile URL — recruiters verify candidates through LinkedIn before shortlisting.");
  if (!hasGithub)
    suggestions.push("Add your GitHub URL — for tech roles, GitHub presence increases recruiter confidence significantly.");
  if (formattingScore < 70)
    suggestions.push("Use a single-column plain text resume format — multi-column layouts cause ATS parsers to misread your content.");
  if (sections.length < 5)
    suggestions.push("Ensure these sections are clearly labeled: Summary, Experience, Education, Skills, Projects.");

  return {
    atsScore,
    keywordMatch,
    formattingScore,
    readabilityScore,
    technicalScore,
    recruiterConfidence: recruiterConf,
    scoreTitle,
    strengths,
    weaknesses,
    missingKeywords,
    matchedSkills,
    missingCriticalSkills,
    formattingIssues,
    suggestions,
    improvedBulletPoints: [], // filled by AI enhancement (optional)
    recruiterVerdict:     "", // filled by AI enhancement (optional)
  };
};