import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE from "../api.js";
import Loader from "../components/Loader";

// ── THREE-DOT MENU ───────────────────────────────────────────
function CardMenu({ onDelete, onView }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-lg leading-none"
      >
        ⋮
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
          <button
            onClick={() => { setOpen(false); onView(); }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left"
          >
            View Report
          </button>
          <div className="border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => { setOpen(false); onDelete(); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 transition text-left"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── COMPACT RESUME CARD ──────────────────────────────────────
function ResumeHistoryCard({ resume, onDelete, onView }) {
  const score = Math.round(resume.analysis?.atsScore || 0);
  const scoreColor =
    score >= 70 ? "text-green-600" :
    score >= 50 ? "text-amber-500" : "text-red-500";
  const scoreBg =
    score >= 70 ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700" :
    score >= 50 ? "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700" :
                  "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700";

  const date = new Date(resume.createdAt);
  const dateStr = date.toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-200 p-4">

      {/* TOP ROW */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-700 rounded-lg flex items-center justify-center text-base shrink-0">
            📄
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[160px]">
              {resume.filename || "Resume"}
            </p>
            <p className="text-xs text-gray-400">{dateStr} · {timeStr}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className={`${scoreBg} border px-2.5 py-1 rounded-lg text-center`}>
            <p className={`text-sm font-bold ${scoreColor}`}>{score}%</p>
          </div>
          <CardMenu onDelete={onDelete} onView={onView} />
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg py-1.5 text-center">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-200">
            {Math.round(resume.analysis?.keywordMatch || 0)}%
          </p>
          <p className="text-xs text-gray-400">Keywords</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg py-1.5 text-center">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-200">
            {resume.analysis?.strengths?.length || 0}
          </p>
          <p className="text-xs text-gray-400">Strengths</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg py-1.5 text-center">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-200">
            {resume.analysis?.missingKeywords?.length || 0}
          </p>
          <p className="text-xs text-gray-400">Gaps</p>
        </div>
      </div>

      {/* SCORE TITLE */}
      {resume.analysis?.scoreTitle && (
        <p className="text-xs text-gray-400 truncate mb-3">{resume.analysis.scoreTitle}</p>
      )}

      {/* VIEW BUTTON */}
      <button
        onClick={onView}
        className="w-full text-xs text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 py-1.5 rounded-lg font-medium transition"
      >
        View Full Report →
      </button>
    </div>
  );
}

// ── MAIN HISTORY PAGE ────────────────────────────────────────
function History() {
  const navigate = useNavigate();
  const [resumes,  setResumes]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(`${API_BASE}/api/resume/history`, {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
      setResumes(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume analysis? This cannot be undone.")) return;
    setDeleting(id);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.delete(`${API_BASE}/api/resume/history/${id}`, {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
      setResumes(resumes.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    } finally {
      setDeleting(null);
    }
  };

  const handleView = async (resume) => {
    if (resume.analysis && Object.keys(resume.analysis).length > 3) {
      navigate("/result", { state: { analysis: resume.analysis } });
      return;
    }
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(
        `${API_BASE}/api/resume/history/${resume._id}`,
        { headers: { Authorization: `Bearer ${userInfo?.token}` } }
      );
      navigate("/result", { state: { analysis: data.analysis } });
    } catch {
      navigate("/result", { state: { analysis: resume.analysis } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analysis History</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
              {resumes.length > 0 ? `${resumes.length} resume${resumes.length > 1 ? "s" : ""} analyzed` : "Your past resume analyses"}
            </p>
          </div>
          <Link
            to="/upload"
            className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded-xl font-semibold hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            + New Analysis
          </Link>
        </div>

        {loading && <Loader message="Loading your history…" />}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
            {error}
          </div>
        )}

        {!loading && !error && resumes.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-14 text-center">
            <div className="text-5xl mb-4">📂</div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No history yet</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
              Upload your first resume to start building your analysis history.
            </p>
            <Link
              to="/upload"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition inline-block"
            >
              Analyze My Resume
            </Link>
          </div>
        )}

        {!loading && resumes.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((r) => (
              <div key={r._id} className={deleting === r._id ? "opacity-50 pointer-events-none" : ""}>
                <ResumeHistoryCard
                  resume={r}
                  onDelete={() => handleDelete(r._id)}
                  onView={() => handleView(r)}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default History;
