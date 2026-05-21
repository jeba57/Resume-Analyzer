import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import API_BASE from "../api.js";

// ── CLICKABLE STAT CARD ───────────────────────────────────────
function StatCard({ label, value, icon, color = "text-gray-900", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 hover:-translate-y-1 hover:shadow-xl transition duration-300 ${onClick ? "cursor-pointer hover:border-blue-200 dark:hover:border-blue-700" : ""}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {onClick && (
          <span className="text-xs text-blue-500 dark:text-blue-400 font-medium">View →</span>
        )}
      </div>
      <p className={`text-3xl font-bold ${color} dark:text-white mb-1`}>{value}</p>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
}

// ── TIMESTAMP FORMATTER ───────────────────────────────────────
const formatDateTime = (dateStr) => {
  const d = new Date(dateStr);
  const date = d.toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
  const time = d.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit",
  });
  return `${date} · ${time}`;
};

// ── MAIN ADMIN PANEL ──────────────────────────────────────────
function Admin() {
  const navigate  = useNavigate();
  const [stats,   setStats]   = useState(null);
  const [users,   setUsers]   = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab,     setTab]     = useState("users");
  const [error,   setError]   = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo?.token) { navigate("/login"); return; }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const headers = { Authorization: `Bearer ${userInfo.token}` };
      const [s, u, r] = await Promise.all([
        axios.get(`${API_BASE}/api/admin/stats`,   { headers }),
        axios.get(`${API_BASE}/api/admin/users`,   { headers }),
        axios.get(`${API_BASE}/api/admin/resumes`, { headers }),
      ]);
      setStats(s.data);
      setUsers(u.data);
      setResumes(r.data);
    } catch (err) {
      if (err.response?.status === 403) {
        console.log(err.response);
        setError("403");
      } else {
        setError(err.response?.data?.message || "Failed to load admin data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user and all their data?")) return;
    try {
      await axios.delete(`${API_BASE}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
      setStats((prev) => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    }
  };

  const scoreColor = (s) =>
    s >= 70 ? "text-green-600" : s >= 50 ? "text-amber-500" : "text-red-500";

  // 403 — not admin
  if (!loading && error === "403") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🛡️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Admin Access Required</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Your account does not have admin privileges.
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 text-left text-sm space-y-2 mb-6">
            <p className="font-semibold text-amber-800 dark:text-amber-300">To enable admin access:</p>
            <p className="text-amber-700 dark:text-amber-400">1. MongoDB Atlas → Browse Collections → users</p>
            <p className="text-amber-700 dark:text-amber-400">2. Click <strong>UPDATE</strong></p>
            <p className="text-amber-700 dark:text-amber-400">3. Filter: <code className="bg-amber-100 px-1 rounded">{"{ \"email\": \"your@email.com\" }"}</code></p>
            <p className="text-amber-700 dark:text-amber-400">4. Update: <code className="bg-amber-100 px-1 rounded">{"{ \"$set\": { \"isAdmin\": true } }"}</code></p>
            <p className="text-amber-700 dark:text-amber-400">5. Log out and log back in</p>
          </div>
          <button onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              <span className="text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-700">
                🛡️ Admin
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              User management · Resume analytics · System overview
            </p>
          </div>
          <button onClick={fetchAll}
            className="text-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            🔄 Refresh
          </button>
        </div>

        {loading && <Loader message="Loading admin data…" />}

        {error && error !== "403" && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-2xl p-5">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {!loading && stats && (
          <>
            {/* ✅ CLICKABLE STAT CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                label="Total Users"
                value={stats.totalUsers}
                icon="👥"
                color="text-blue-600"
                onClick={() => setTab("users")}
              />
              <StatCard
                label="Resume Analyses"
                value={stats.totalResumes}
                icon="📄"
                color="text-green-600"
                onClick={() => setTab("resumes")}
              />
              <StatCard
                label="Cover Letters"
                value={stats.totalLetters || 0}
                icon="✉️"
                color="text-purple-600"
                onClick={() => setTab("resumes")}
              />
              <StatCard
                label="Avg ATS Score"
                value={`${stats.avgAtsScore}%`}
                icon="🎯"
                color="text-amber-500"
              />
            </div>

            {/* TABS */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
              {[
                { id: "users",   label: `👥 Users (${users.length})` },
                { id: "resumes", label: `📄 Resumes (${resumes.length})` },
              ].map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`px-5 py-2 text-sm font-semibold rounded-lg transition ${
                    tab === t.id
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* USERS TABLE */}
            {tab === "users" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                        {["User", "Email", "Role", "Joined", "Actions"].map((h) => (
                          <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {users.length === 0 ? (
                        <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400 text-sm">No users found.</td></tr>
                      ) : users.map((u) => (
                        <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                {u.name?.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white">{u.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{u.email}</td>
                          <td className="px-5 py-4">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              u.isAdmin
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            }`}>
                              {u.isAdmin ? "🛡️ Admin" : "User"}
                            </span>
                          </td>
                          {/* ✅ Exact date + time */}
                          <td className="px-5 py-4 text-gray-500 dark:text-gray-400 text-xs">
                            {formatDateTime(u.createdAt)}
                          </td>
                          <td className="px-5 py-4">
                            {!u.isAdmin ? (
                              <button onClick={() => deleteUser(u._id)}
                                className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition hover:bg-red-50">
                                Delete
                              </button>
                            ) : (
                              <span className="text-xs text-gray-300 dark:text-gray-600">Protected</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* RESUMES TABLE */}
            {tab === "resumes" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                        {["User", "Filename", "ATS Score", "Keywords", "Score Title", "Date & Time"].map((h) => (
                          <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {resumes.length === 0 ? (
                        <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400 text-sm">No resume analyses yet.</td></tr>
                      ) : resumes.map((r) => (
                        <tr key={r._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                          <td className="px-5 py-4">
                            <p className="font-medium text-gray-900 dark:text-white">{r.user?.name || "—"}</p>
                            <p className="text-xs text-gray-400">{r.user?.email || ""}</p>
                          </td>
                          <td className="px-5 py-4 text-gray-600 dark:text-gray-400 max-w-[140px]">
                            <p className="truncate text-xs">{r.filename || "resume.pdf"}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-sm font-bold ${scoreColor(r.analysis?.atsScore || 0)}`}>
                              {r.analysis?.atsScore || 0}%
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                              {Math.round(r.analysis?.keywordMatch || 0)}%
                            </span>
                          </td>
                          <td className="px-5 py-4 text-gray-500 dark:text-gray-400 text-xs max-w-[160px]">
                            <p className="truncate">{r.analysis?.scoreTitle || "—"}</p>
                          </td>
                          {/* ✅ Exact date + time */}
                          <td className="px-5 py-4 text-gray-500 dark:text-gray-400 text-xs">
                            {formatDateTime(r.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default Admin;
