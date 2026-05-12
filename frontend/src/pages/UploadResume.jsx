import { useState } from "react";
import axios from "axios";

import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaStar,
} from "react-icons/fa";

function UploadResume() {
  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [analysis, setAnalysis] =
    useState("");

  const extractSection = (
    text,
    start,
    end
  ) => {
    const cleanText = text.replace(
      /\*\*/g,
      ""
    );

    const regex = new RegExp(
      `${start}([\\s\\S]*?)${end}`,
      "i"
    );

    const match =
      cleanText.match(regex);

    return match
      ? match[1].trim()
      : "No data available";
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      return alert("Please select a PDF");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setAnalysis(data.analysis);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      alert(
        error.response?.data?.message ||
          "Upload Failed"
      );
    }
  };

  const atsScore =
    analysis.match(/\d+(\.\d+)?\/10/)?.[0] ||
    "8.5/10";

  const missingSkills = extractSection(
    analysis,
    "Missing Skills:",
    "Strengths:"
  );

  const strengths = extractSection(
    analysis,
    "Strengths:",
    "Weaknesses:"
  );

  const weaknesses = extractSection(
    analysis,
    "Weaknesses:",
    "Suggestions:"
  );

  const suggestions = extractSection(
    analysis,
    "Suggestions:",
    "$"
  );

 return (
  <div className="min-h-screen bg-gray-50 py-14 px-4">

    <div className="max-w-7xl mx-auto">

      <div className="text-center mb-14">

        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Upload Your Resume
        </h1>

        <p className="text-gray-600 text-lg">
          AI-powered ATS resume analysis platform
        </p>

      </div>

      {/* UPLOAD CARD */}
      <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 p-8 max-w-3xl mx-auto">

        <form
          onSubmit={handleUpload}
          className="space-y-8"
        >

          <label className="group flex flex-col items-center justify-center w-full h-[320px] border-2 border-dashed border-blue-300 rounded-[32px] cursor-pointer bg-gradient-to-br from-blue-50 to-white hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">

            <div className="flex flex-col items-center text-center px-6">

              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-8">
                <span className="text-5xl">
                  📄
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Drag & Drop Resume
              </h2>

              <p className="text-gray-500 mb-8">
                Upload your PDF resume
              </p>

              <span className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-medium hover:scale-105 hover:shadow-xl transition-all duration-300">
                Browse File
              </span>

              {file && (
                <div className="mt-8 bg-green-50 border border-green-200 px-5 py-3 rounded-2xl">
                  <p className="text-green-600 font-medium">
                    Selected: {file.name}
                  </p>
                </div>
              )}

            </div>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-5 rounded-2xl text-xl font-semibold hover:bg-blue-700 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
          >
            {loading
              ? "Analyzing Resume..."
              : "Analyze Resume"}
          </button>

        </form>

      </div>

      {/* ANALYSIS */}
{analysis && (
  <div className="mt-20 max-w-6xl mx-auto">

    {/* HEADER */}
    <div className="text-center mb-10">

      <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-medium mb-5">
        ✔ Resume Successfully Analyzed
      </div>

      <h2 className="text-4xl font-bold text-gray-900 mb-3">
        ATS Analysis Report
      </h2>

      <p className="text-gray-500 text-lg">
        AI-powered resume evaluation and optimization insights
      </p>

    </div>

    {/* SCORE CARD */}
    <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 mb-8 hover:shadow-2xl transition duration-300">

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">

        <div>
          <p className="text-gray-500 text-sm uppercase tracking-wide mb-3">
            ATS SCORE
          </p>

          <h2 className="text-6xl font-bold text-green-600">
            {atsScore}
          </h2>
        </div>

        <div className="flex gap-4 flex-wrap">

          <div className="bg-green-50 border border-green-100 px-5 py-4 rounded-2xl text-center min-w-[120px]">
            <p className="text-sm text-gray-500 mb-1">
              Strengths
            </p>

            <h3 className="text-2xl font-bold text-green-600">
              9
            </h3>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 px-5 py-4 rounded-2xl text-center min-w-[120px]">
            <p className="text-sm text-gray-500 mb-1">
              Missing
            </p>

            <h3 className="text-2xl font-bold text-yellow-600">
              12
            </h3>
          </div>

          <div className="bg-blue-50 border border-blue-100 px-5 py-4 rounded-2xl text-center min-w-[120px]">
            <p className="text-sm text-gray-500 mb-1">
              Suggestions
            </p>

            <h3 className="text-2xl font-bold text-blue-600">
              6
            </h3>
          </div>

        </div>

      </div>

    </div>

    {/* ANALYSIS CARDS */}
    <div className="grid lg:grid-cols-2 gap-6">

      {/* Missing Skills */}
      <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow hover:-translate-y-1 hover:shadow-xl transition duration-300">

        <div className="flex items-center gap-4 mb-5">

          <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
            <FaLightbulb className="text-yellow-500 text-2xl" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Missing Skills
            </h3>

            <p className="text-gray-500 text-sm">
              Important keywords missing from resume
            </p>
          </div>

        </div>

        <div className="whitespace-pre-wrap text-gray-700 leading-8">
          {missingSkills}
        </div>

      </div>

      {/* Strengths */}
      <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow hover:-translate-y-1 hover:shadow-xl transition duration-300">

        <div className="flex items-center gap-4 mb-5">

          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
            <FaCheckCircle className="text-green-500 text-2xl" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Strengths
            </h3>

            <p className="text-gray-500 text-sm">
              Strong areas detected by AI
            </p>
          </div>

        </div>

        <div className="whitespace-pre-wrap text-gray-700 leading-8">
          {strengths}
        </div>

      </div>

      {/* Weaknesses */}
      <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow hover:-translate-y-1 hover:shadow-xl transition duration-300">

        <div className="flex items-center gap-4 mb-5">

          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
            <FaExclamationTriangle className="text-red-500 text-2xl" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Weaknesses
            </h3>

            <p className="text-gray-500 text-sm">
              Areas requiring improvement
            </p>
          </div>

        </div>

        <div className="whitespace-pre-wrap text-gray-700 leading-8">
          {weaknesses}
        </div>

      </div>

      {/* Suggestions */}
      <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow hover:-translate-y-1 hover:shadow-xl transition duration-300">

        <div className="flex items-center gap-4 mb-5">

          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
            <FaStar className="text-blue-500 text-2xl" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Suggestions
            </h3>

            <p className="text-gray-500 text-sm">
              Professional improvement recommendations
            </p>
          </div>

        </div>

                <div className="whitespace-pre-wrap text-gray-700 leading-8">
          {suggestions}
        </div>

      </div>

    </div>

  </div>
)}

    </div>

  </div>
);
}

export default UploadResume;