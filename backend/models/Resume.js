import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user:           { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    filename:       { type: String, default: "resume.pdf" },
    jobDescription: { type: String, default: "" },
    analysis: {
      atsScore:             { type: Number, default: 0 },
      keywordMatch:         { type: Number, default: 0 },
      formattingScore:      { type: Number, default: 0 },
      readabilityScore:     { type: Number, default: 0 },
      technicalScore:       { type: Number, default: 0 },
      recruiterConfidence:  { type: Number, default: 0 },
      scoreTitle:           { type: String, default: "" },
      strengths:            [String],
      weaknesses:           [String],
      missingKeywords:      [String],
      matchedSkills:        [String],
      missingCriticalSkills:[String],
      formattingIssues:     [String],
      suggestions:          [String],
      improvedBulletPoints: [mongoose.Schema.Types.Mixed],
      recruiterVerdict:     { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;