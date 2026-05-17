import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function StatCard({ label, value, color = "text-gray-900", icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 hover:-translate-y-1 hover:shadow-xl transition duration-300">
      <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">{label}</p>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <span className={`text-3xl font-bold ${color} dark:text-white`}>{value}</span>
      </div>
    </div>
  );
}

function Admin() {
  const navigate  = useNavigate();
  const [stats, setStats]     = useState(null);
  const [users, setUsers]     = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState("users");
  const [error, setError]     = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo?.isAdmin) { navigate("/"); return; }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
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
      setError(err.response?.data?.message || "Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user and all their data?")) return;
    try {
      const headers = { Authorization: `Bearer ${userInfo.token}` };
      await axios.delete(`${API_BASE}/api/admin/users/${id}`, { headers });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    }
  };

  const scoreColor = (s) =>
    s >= 70 ? "text-green-600" : s >= 50 ? "text-amber-500" : "text-red-500";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              System overview · User management · Resume analytics
            </p>
          </div>
          <span className="text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-700">
            🛡️ Admin Access
          </span>
        </div>

        {loading && <Loader message="Loading admin data…" />}
        {error   && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>}

        {!loading && stats && (
          <>
            {/* STATS */}
            <div
              data-cy="admin-stats"
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <StatCard label="Total Users"      value={stats.totalUsers}   icon="👥" color="text-blue-600" />
              <StatCard label="Total Analyses"   value={stats.totalResumes} icon="📄" color="text-green-600" />
              <StatCard label="Cover Letters"    value={stats.totalLetters} icon="✉️" color="text-purple-600" />
              <StatCard label="Avg ATS Score"    value={`${stats.avgAtsScore}%`} icon="🎯" color="text-amber-500" />
            </div>

            {/* TABS */}
            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
              {["users", "resumes"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2.5 text-sm font-semibold capitalize border-b-2 transition ${
                    tab === t
                      ? "border-blue-600 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {t === "users" ? `👥 Users (${users.length})` : `📄 Resumes (${resumes.length})`}
                </button>
              ))}
            </div>

            {/* USERS TABLE */}
            {tab === "users" && (
              <div
                data-cy="admin-users-table"
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {users.map((u) => (
                        <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                          <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{u.name}</td>
                          <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{u.email}</td>
                          <td className="px-5 py-4">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              u.isAdmin
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            }`}>
                              {u.isAdmin ? "Admin" : "User"}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                            {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </td>
                          <td className="px-5 py-4">
                            {!u.isAdmin && (
                              <button
                                onClick={() => deleteUser(u._id)}
                                className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition hover:bg-red-50"
                              >
                                Delete
                              </button>
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
              <div
                data-cy="admin-resumes-table"
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Filename</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ATS Score</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score Title</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {resumes.map((r) => (
                        <tr key={r._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                          <td className="px-5 py-4">
                            <p className="font-medium text-gray-900 dark:text-white">{r.user?.name}</p>
                            <p className="text-xs text-gray-400">{r.user?.email}</p>
                          </td>
                          <td className="px-5 py-4 text-gray-600 dark:text-gray-400 max-w-[160px] truncate">{r.filename}</td>
                          <td className="px-5 py-4">
                            <span className={`text-base font-bold ${scoreColor(r.analysis?.atsScore)}`}>
                              {r.analysis?.atsScore || 0}%
                            </span>
                          </td>
                          <td className="px-5 py-4 text-gray-500 dark:text-gray-400 text-xs">{r.analysis?.scoreTitle || "—"}</td>
                          <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                            {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
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
