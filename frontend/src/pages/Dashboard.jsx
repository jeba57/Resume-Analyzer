import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../api.js";

function Dashboard() {
  const navigate  = useNavigate();
  const [user,    setUser]    = useState(null);
  const [stats,   setStats]   = useState({ total: 0, best: "—" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    if (!info) { navigate("/login"); return; }
    setUser(info);

    axios
      .get(`${API_BASE}/api/resume/history`, {
        headers: { Authorization: `Bearer ${info.token}` },
      })
      .then(({ data }) => {
        const best = data.length
          ? Math.max(...data.map((r) => r.analysis?.atsScore || 0))
          : null;
        setStats({
          total: data.length,
          best:  best !== null ? `${best}%` : "—",
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [navigate]);

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* WELCOME */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 md:p-10 text-white shadow-xl">
          <p className="text-xs uppercase tracking-widest text-blue-200 mb-3 font-semibold">
            Resume Intelligence Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-blue-100 text-base leading-relaxed max-w-2xl">
            Analyze resumes, generate cover letters, and track your ATS score improvements.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Analyses",  value: loading ? "…" : stats.total, color: "text-gray-900 dark:text-white" },
            { label: "Best ATS Score",  value: loading ? "…" : stats.best,  color: "text-green-600" },
            { label: "Cover Letters",   value: "—",                          color: "text-purple-600" },
            { label: "Resume Health",   value: stats.total > 0 ? "Active" : "—", color: "text-amber-500" },
          ].map((s) => (
            <div key={s.label}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 hover:-translate-y-1 hover:shadow-xl transition duration-300">
              <p className="text-xs text-gray-400 font-medium mb-2">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              to: "/upload", icon: "📄",
              title: "Analyze Resume",
              desc: "Get ATS score, keyword gaps, bullet rewrites, and recruiter verdict.",
            },
            {
              to: "/cover-letter", icon: "✉️",
              title: "Cover Letter",
              desc: "Generate an A4 professional cover letter aligned to any job description.",
            },
            {
              to: "/history", icon: "📂",
              title: "History",
              desc: "View all past resume analyses with scores, dates, and full reports.",
            },
          ].map((a) => (
            <Link key={a.to} to={a.to}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-7 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-xl transition duration-300 group">
              <div className="text-3xl">{a.icon}</div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition">
                {a.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{a.desc}</p>
            </Link>
          ))}
        </div>

        {/* TIPS */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-7">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">💡 Quick Tips</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "🎯", title: "Paste the job description", desc: "Always include the JD when analyzing — it dramatically improves keyword match accuracy." },
              { icon: "✏️", title: "Apply bullet rewrites",     desc: "The AI rewrites your weakest bullets. Copy them into your actual resume before applying." },
              { icon: "📊", title: "Aim for 70%+ ATS score",   desc: "Resumes above 70% have a significantly higher chance of passing automated filters." },
            ].map((t) => (
              <div key={t.title} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-xl mb-2">{t.icon}</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1">{t.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
