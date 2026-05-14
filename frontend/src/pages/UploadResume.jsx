import { useState } from "react";

import axios from "axios";

import ATSScoreCard from "../components/ATSScoreCard";
import ATSBreakdown from "../components/ATSBreakdown";
import StrengthList from "../components/StrengthList";
import WeaknessList from "../components/WeaknessList";
import SuggestionPanel from "../components/SuggestionPanel";
import KeywordMatch from "../components/KeywordMatch";
import RecruiterVerdict from "../components/RecruiterVerdict";

function UploadResume() {

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [analysis, setAnalysis] =
    useState(null);

  const [jobDescription,
    setJobDescription] =
    useState("");

  const handleUpload = async (
    e
  ) => {

    e.preventDefault();

    if (!file) {

      return alert(
        "Please upload a PDF resume"
      );
    }

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "resume",
        file
      );

      formData.append(
        "jobDescription",
        jobDescription
      );

      const userInfo = JSON.parse(
  localStorage.getItem(
    "userInfo"
  )
);

const response =
  await axios.post(

    "http://localhost:5000/api/resume/upload",

    formData,

    {
      headers: {

        Authorization:
          `Bearer ${userInfo?.token}`,

        "Content-Type":
          "multipart/form-data",
      },
    }
  );

      console.log(
        "UPLOAD RESPONSE:",
        response.data
      );

      const analysisData =
        response.data.analysis ||
        response.data;

      setAnalysis(
        analysisData
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

      alert(
        error.response?.data
          ?.message ||
        "Resume upload failed"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 py-14 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-14">

          <h1 className="text-5xl font-bold text-gray-900 mb-4">

            Upload Your Resume

          </h1>

          <p className="text-xl text-gray-600">

            Recruiter-grade AI resume intelligence platform

          </p>

        </div>

        {/* UPLOAD SECTION */}

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-14 border border-gray-100">

          <form
            onSubmit={handleUpload}
            className="space-y-8"
          >

            {/* FILE UPLOAD */}

            <div>

              <label className="block text-xl font-semibold text-gray-800 mb-4">

                📄 Upload Resume PDF

              </label>

              <div className="border-2 border-dashed border-blue-300 rounded-3xl p-10 text-center bg-blue-50 hover:bg-blue-100 transition">

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setFile(
                      e.target.files[0]
                    )
                  }
                  className="hidden"
                  id="resumeUpload"
                />

                <label
                  htmlFor="resumeUpload"
                  className="cursor-pointer"
                >

                  <div className="text-6xl mb-4">

                    📄

                  </div>

                  <p className="text-xl font-semibold text-gray-700 mb-2">

                    Drag & Drop Resume

                  </p>

                  <p className="text-gray-500 mb-6">

                    Upload your PDF resume

                  </p>

                  <span className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-lg hover:bg-blue-700 transition">

                    Browse File

                  </span>

                </label>

              </div>

              {file && (

                <p className="mt-4 text-green-600 font-medium">

                  Selected:
                  {" "}
                  {file.name}

                </p>

              )}

            </div>

            {/* JOB DESCRIPTION */}

            <div>

              <label className="block text-xl font-semibold text-gray-800 mb-4">

                🎯 Target Job Description

              </label>

              <textarea
                placeholder="Paste the job description you are applying for..."
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(
                    e.target.value
                  )
                }
                className="w-full h-44 border border-gray-200 rounded-3xl p-5 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl text-xl font-semibold transition"
            >

              {loading
                ? "Analyzing Resume..."
                : "Generate ATS Intelligence Report"}

            </button>

          </form>

        </div>

        {/* ANALYSIS SECTION */}

        {analysis && (

          <div className="space-y-10">

            {/* SCORE CARDS */}

            <div className="grid md:grid-cols-4 gap-6">

              <ATSScoreCard
                title="ATS Score"
                score={
                  analysis.atsScore
                }
              />

              <ATSScoreCard
                title="Keyword Match"
                score={
                  analysis.keywordMatch
                }
              />

              <ATSScoreCard
                title="Recruiter Confidence"
                score={
                  analysis.recruiterConfidence
                }
              />

              <ATSScoreCard
                title="Technical Score"
                score={
                  analysis.technicalScore
                }
              />

            </div>

            {/* BREAKDOWN */}

            <ATSBreakdown
              atsScore={
                analysis.atsScore
              }
              keywordMatch={
                analysis.keywordMatch
              }
            />

            {/* STRENGTHS + WEAKNESSES */}

            <div className="grid md:grid-cols-2 gap-8">

              <StrengthList
                strengths={
                  analysis.strengths
                }
              />

              <WeaknessList
                weaknesses={
                  analysis.weaknesses
                }
              />

            </div>

            {/* KEYWORD MATCH */}

            <KeywordMatch
              keywordMatch={
                analysis.keywordMatch
              }
              missingKeywords={
                analysis.missingKeywords
              }
            />

            {/* MATCHED + MISSING */}

            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-white p-8 rounded-3xl shadow border border-gray-100">

                <h2 className="text-3xl font-bold text-gray-900 mb-6">

                  Matched Skills

                </h2>

                <div className="flex flex-wrap gap-3">

                  {analysis?.matchedSkills?.map(
                    (
                      skill,
                      index
                    ) => (

                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium"
                      >

                        {skill}

                      </span>
                    )
                  )}

                </div>

              </div>

              <div className="bg-white p-8 rounded-3xl shadow border border-gray-100">

                <h2 className="text-3xl font-bold text-gray-900 mb-6">

                  Missing Critical Skills

                </h2>

                <div className="flex flex-wrap gap-3">

                  {analysis?.missingCriticalSkills?.map(
                    (
                      skill,
                      index
                    ) => (

                      <span
                        key={index}
                        className="bg-red-100 text-red-600 px-5 py-2 rounded-full font-medium"
                      >

                        {skill}

                      </span>
                    )
                  )}

                </div>

              </div>

            </div>

            {/* SUGGESTIONS */}

            <SuggestionPanel
              suggestions={
                analysis.suggestions
              }
              improvedBulletPoints={
                analysis.improvedBulletPoints
              }
            />

            {/* VERDICT */}

            <RecruiterVerdict
              verdict={
                analysis.recruiterVerdict
              }
            />

          </div>
        )}

      </div>

    </div>
  );
}

export default UploadResume;