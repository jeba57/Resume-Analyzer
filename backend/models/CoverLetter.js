import mongoose from "mongoose";

const coverLetterSchema = new mongoose.Schema(
  {
    user:           { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobDescription: { type: String, default: "" },
    content:        { type: String, required: true },
  },
  { timestamps: true }
);

const CoverLetter = mongoose.model("CoverLetter", coverLetterSchema);
export default CoverLetter;