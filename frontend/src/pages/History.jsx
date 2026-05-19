import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ResumeCard from "../components/ResumeCard";
import Loader from "../components/Loader";

import API_BASE from "../api.js";

function History() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
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
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analysis History</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">All your past resume analyses</p>
          </div>
          <Link
            to="/upload"
            className="bg-blue-600 text-white text-sm px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            + New Analysis
          </Link>
        </div>

        {loading && <Loader message="Loading your history…" />}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>
        )}

        {!loading && !error && resumes.length === 0 && (
          <div
            data-cy="history-empty"
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-16 text-center"
          >
            <div className="text-5xl mb-4">📂</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No history yet</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto mb-6">
              Upload and analyze your first resume to start building your analysis history.
            </p>
            <Link
              to="/upload"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-all duration-300 inline-block"
            >
              Analyze My Resume
            </Link>
          </div>
        )}

        {!loading && resumes.length > 0 && (
          <div
            data-cy="history-list"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {resumes.map((r) => (
              <ResumeCard
                key={r._id}
                analysis={r.analysis}
                filename={r.filename}
                date={new Date(r.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default History;
