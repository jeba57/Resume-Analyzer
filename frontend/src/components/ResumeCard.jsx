import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ResumeCard({ analysis, filename, date, resumeId }) {
  const navigate = useNavigate();
  const score    = Math.round(analysis?.atsScore || 0);
  const scoreColor =
    score >= 70 ? "text-green-600" :
    score >= 50 ? "text-amber-500" : "text-red-500";
  const bgColor =
    score >= 70 ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700" :
    score >= 50 ? "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700" :
                  "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700";

  const viewReport = async () => {
    if (analysis && Object.keys(analysis).length > 3) {
      navigate("/result", { state: { analysis } });
      return;
    }
    // Fetch full analysis if only partial data in history list
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(`${API_BASE}/api/resume/history/${resumeId}`, {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
      navigate("/result", { state: { analysis: data.analysis } });
    } catch {
      navigate("/result", { state: { analysis } });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 hover:-translate-y-1 hover:shadow-xl transition duration-300">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-700 rounded-xl flex items-center justify-center text-lg shrink-0">
            📄
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {filename || "Resume"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{date}</p>
          </div>
        </div>
        <div className={`${bgColor} border px-3 py-1.5 rounded-xl text-center shrink-0`}>
          <p className={`text-lg font-bold ${scoreColor}`}>{score}%</p>
          <p className="text-xs text-gray-400">ATS Score</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center mb-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl py-2">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-200">
            {Math.round(analysis?.keywordMatch || 0)}%
          </p>
          <p className="text-xs text-gray-400">Keywords</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl py-2">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-200">
            {analysis?.strengths?.length || 0}
          </p>
          <p className="text-xs text-gray-400">Strengths</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl py-2">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-200">
            {analysis?.missingKeywords?.length || 0}
          </p>
          <p className="text-xs text-gray-400">Gaps</p>
        </div>
      </div>

      <button
        onClick={viewReport}
        className="w-full text-sm text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 py-2 rounded-xl font-medium transition hover:scale-105 duration-300"
      >
        View Full Report →
      </button>
    </div>
  );
}

export default ResumeCard;
