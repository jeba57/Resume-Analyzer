import { useState } from "react";
import axios from "axios";
import UploadBox from "../components/UploadBox";
import Loader from "../components/Loader";

import API_BASE from "../api.js";

function CoverLetter() {
  const [file, setFile]       = useState(null);
  const [jd, setJD]           = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError]     = useState("");
  const [copied, setCopied]   = useState(false);

  const generate = async (e) => {
    e.preventDefault();
    if (!file && !jd.trim()) {
      setError("Please upload a resume or enter a job description.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const formData = new FormData();
      if (file) formData.append("resume", file);
      formData.append("jobDescription", jd);

      const { data } = await axios.post(
        `${API_BASE}/api/cover-letter/generate`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setContent(data.content);
    } catch (err) {
      setError(err.response?.data?.message || "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Cover Letter</title>
          <style>
            body {
              font-family: 'Times New Roman', serif;
              font-size: 12pt;
              line-height: 1.9;
              max-width: 210mm;
              margin: 20mm auto;
              color: #1a1a1a;
              padding: 0 10mm;
            }
            pre { white-space: pre-wrap; font-family: inherit; }
            @media print { body { margin: 20mm; } }
          </style>
        </head>
        <body><pre>${content}</pre></body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cover Letter Generator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            AI-generated A4 professional cover letter — keyword-aligned to your target role
          </p>
        </div>

        {/* FORM */}
        {!content && !loading && (
          <form onSubmit={generate} className="space-y-5">

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Upload Resume
                <span className="ml-2 font-normal text-gray-400 text-xs">PDF — optional</span>
              </p>
              <UploadBox onFileSelect={(f) => { setFile(f); setError(""); }} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Job Description
                <span className="ml-2 font-normal text-gray-400 text-xs">Required for keyword alignment</span>
              </label>
              <textarea
                data-cy="cover-letter-jd"
                rows={6}
                placeholder="Paste the full job description here. The AI will align keywords and tailor the letter to this specific role…"
                value={jd}
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
              data-cy="generate-cover-letter-btn"
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-base font-semibold transition hover:shadow-lg hover:scale-105 duration-300"
            >
              Generate Professional Cover Letter
            </button>
          </form>
        )}

        {/* LOADING */}
        {loading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <Loader
              message="Writing your cover letter…"
              subMessage="Aligning keywords and crafting professional language…"
            />
          </div>
        )}

        {/* RESULT — A4 PREVIEW */}
        {content && !loading && (
          <div className="space-y-4">

            {/* ACTION BAR */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Your Cover Letter</h2>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleCopy}
                  className="text-sm border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition hover:scale-105 duration-300"
                >
                  {copied ? "✓ Copied!" : "Copy Text"}
                </button>
                <button
                  data-cy="print-cover-letter"
                  onClick={handlePrint}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition hover:scale-105 hover:shadow-lg duration-300"
                >
                  Print / Save PDF
                </button>
                <button
                  onClick={() => { setContent(""); setFile(null); setJD(""); }}
                  className="text-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Regenerate
                </button>
              </div>
            </div>

            {/* A4 PAPER */}
            <div
              data-cy="cover-letter-output"
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
              style={{ maxWidth: "794px", margin: "0 auto", padding: "60px 72px", minHeight: "1000px" }}
            >
              <pre
                className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words leading-8"
                style={{
                  fontFamily: "'Times New Roman', Georgia, serif",
                  fontSize: "12pt",
                  lineHeight: "1.9",
                }}
              >
                {content}
              </pre>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default CoverLetter;
