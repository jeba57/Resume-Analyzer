import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const loadingSteps = [
    "Parsing resume structure…",
    "Evaluating ATS keyword density…",
    "Simulating recruiter review…",
    "Detecting formatting risks…",
    "Generating optimized rewrites…",
    "Computing final ATS score…",
  ];
  const [loadingStep, setLoadingStep] = useState(0);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
      setError("");
    } else {
      setError("Please upload a PDF file.");
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setError("");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { setError("Please upload a PDF resume."); return; }

    setError("");
    setLoading(true);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
    }, 1800);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const response = await axios.post(
        `${API_BASE}/api/resume/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      clearInterval(interval);
      const analysisData = response.data.analysis || response.data;
      navigate("/result", { state: { analysis: analysisData } });
    } catch (err) {
      clearInterval(interval);
      setLoading(false);
      setError(err.response?.data?.message || "Resume analysis failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Intelligence</h1>
          <p className="text-gray-500">Upload your resume for a recruiter-grade ATS analysis</p>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center mb-6">
            <div className="w-14 h-14 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mx-auto mb-5" />
            <p className="text-gray-700 font-medium text-lg mb-1">Analyzing your resume</p>
            <p className="text-gray-400 text-sm">{loadingSteps[loadingStep]}</p>
          </div>
        )}

        {/* UPLOAD FORM */}
        {!loading && (
          <form onSubmit={handleUpload} className="space-y-5">

            {/* DROP ZONE */}
            <div
              className={`bg-white rounded-2xl border-2 border-dashed transition-all duration-200 p-10 text-center cursor-pointer
                ${dragOver ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("resumeFile").click()}
            >
              <input
                type="file"
                id="resumeFile"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="text-4xl mb-3">📄</div>
              {file ? (
                <>
                  <p className="text-green-600 font-semibold text-base">{file.name}</p>
                  <p className="text-gray-400 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB · Click to change</p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 font-semibold text-base mb-1">Drop your resume here</p>
                  <p className="text-gray-400 text-sm">PDF format · Click to browse</p>
                </>
              )}
            </div>

            {/* JOB DESCRIPTION */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Job Description
                <span className="ml-2 text-xs text-gray-400 font-normal">Optional — improves keyword accuracy</span>
              </label>
              <textarea
                placeholder="Paste the job description you are applying for. The AI will match keywords, required skills, and role expectations against your resume…"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={5}
                className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={!file || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-2xl text-base font-semibold transition-all duration-200 hover:shadow-lg"
            >
              Generate ATS Intelligence Report
            </button>

            <p className="text-center text-xs text-gray-400">
              Your resume is analyzed securely and never stored permanently.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default UploadResume;
