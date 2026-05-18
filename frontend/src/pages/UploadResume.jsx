import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/UploadBox";
import Loader from "../components/Loader";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const LOADING_STEPS = [
  "Parsing resume structure…",
  "Evaluating ATS keyword density…",
  "Simulating recruiter review…",
  "Detecting formatting risks…",
  "Generating optimized rewrites…",
  "Computing final ATS score…",
];

function UploadResume() {
  const [file, setFile]             = useState(null);
  const [jobDescription, setJD]     = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [stepIndex, setStepIndex]   = useState(0);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { setError("Please select a PDF resume."); return; }
    setError("");
    setLoading(true);
    setStepIndex(0);

    const interval = setInterval(() =>
      setStepIndex((p) => (p + 1) % LOADING_STEPS.length), 1800);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const { data } = await axios.post(
        
        `${API_BASE}/api/resume/upload`, formData,
        { headers: { Authorization: `Bearer ${userInfo?.token}`, "Content-Type": "multipart/form-data" } }
      );
       console.log(data);

      clearInterval(interval);
      navigate("/result", { state: { analysis: data.analysis, resumeId: data.resumeId } });
    } catch (err) {
      clearInterval(interval);
      setLoading(false);
      setError(err.response?.data?.message || "Analysis failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Resume Intelligence</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Upload your resume for a recruiter-grade ATS analysis in under 30 seconds
          </p>
        </div>

        {loading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <Loader message="Analyzing your resume…" subMessage={LOADING_STEPS[stepIndex]} />
          </div>
        )}

        {!loading && (
          <form onSubmit={handleUpload} className="space-y-5">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
              <UploadBox onFileSelect={(f) => { setFile(f); setError(""); }} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Target Job Description
                <span className="ml-2 font-normal text-gray-400 text-xs">Optional — improves keyword accuracy</span>
              </label>
              <textarea
                data-cy="job-description"
                rows={5}
                placeholder="Paste the job description here. The AI matches keywords, required skills, and role expectations against your resume…"
                value={jobDescription}
                onChange={(e) => setJD(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2 transition"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              data-cy="analyze-btn"
              type="submit" disabled={!file}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-2xl text-base font-semibold transition hover:shadow-lg hover:scale-105 duration-300"
            >
              Generate ATS Intelligence Report
            </button>

            <p className="text-center text-xs text-gray-400">
              Your resume is processed securely and never stored permanently.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default UploadResume;
