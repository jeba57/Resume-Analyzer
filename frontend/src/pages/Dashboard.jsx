import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    if (!info) { navigate("/login"); return; }
    setUser(info);
  }, [navigate]);

  const firstName = user?.name?.split(" ")[0] || "there";

  const insights = [
    { label: "ATS Compatibility", status: "Upload to evaluate", color: "text-gray-400", bg: "bg-gray-50" },
    { label: "Keyword Optimization", status: "Upload to evaluate", color: "text-gray-400", bg: "bg-gray-50" },
    { label: "Recruiter Confidence", status: "Upload to evaluate", color: "text-gray-400", bg: "bg-gray-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* WELCOME HERO */}
        <div className="bg-blue-600 rounded-2xl p-8 md:p-10 text-white">
          <p className="text-xs uppercase tracking-widest text-blue-200 mb-3 font-semibold">Resume Intelligence Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome back, {firstName}</h1>
          <p className="text-blue-100 text-base leading-relaxed max-w-2xl">
            Track your resume performance, ATS scores, and AI-powered insights. Upload a resume to get started.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Uploads", value: "0", color: "text-gray-900" },
            { label: "Best ATS Score", value: "—", color: "text-green-600" },
            { label: "AI Suggestions", value: "—", color: "text-blue-600" },
            { label: "Resume Health", value: "—", color: "text-amber-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-xs text-gray-400 font-medium mb-2">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Ready to analyze?</h2>
            <p className="text-sm text-gray-500">Upload a resume and get your ATS score in under 30 seconds.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              to="/upload"
              className="bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
            >
              Upload Resume
            </Link>
            <Link
              to="/history"
              className="border border-gray-200 text-gray-700 px-5 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
            >
              View History
            </Link>
          </div>
        </div>

        {/* RECENT ANALYSIS — EMPTY STATE */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h2 className="text-base font-bold text-gray-900 mb-5">Recent Analysis</h2>
          <div className="border-2 border-dashed border-gray-100 rounded-2xl p-10 text-center">
            <div className="text-4xl mb-3">📄</div>
            <p className="text-gray-700 font-semibold mb-1">No analyses yet</p>
            <p className="text-gray-400 text-sm mb-5">Upload your first resume to see your ATS report here.</p>
            <Link
              to="/upload"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
            >
              Upload Resume
            </Link>
          </div>
        </div>

        {/* INSIGHTS + PROMO */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <h2 className="text-base font-bold text-gray-900 mb-5">Resume Insights</h2>
            <div className="space-y-3">
              {insights.map((item) => (
                <div key={item.label} className={`flex items-center justify-between ${item.bg} px-4 py-3.5 rounded-xl`}>
                  <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                  <span className={`text-xs font-semibold ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-8 text-white flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-200 mb-3 font-semibold">AI Resume Intelligence</p>
              <h2 className="text-2xl font-bold mb-3">Improve your ATS score faster</h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Get AI-powered recommendations, recruiter-friendly improvements, and keyword optimization in seconds.
              </p>
            </div>
            <Link
              to="/upload"
              className="inline-block bg-white text-blue-600 px-5 py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-200 text-center"
            >
              Analyze New Resume
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
