import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const dropRef  = useRef(null);

  const [dropOpen,   setDropOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode,   setDarkMode]   = useState(
    () => document.documentElement.classList.contains("dark")
  );

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ Fixed dark mode toggle
  const toggleDark = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
    setDropOpen(false);
  };

  // ✅ Logout clears storage and redirects
  const logout = () => {
    localStorage.removeItem("userInfo");
    setDropOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  const navCls = ({ isActive }) =>
    isActive
      ? "text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400 pb-0.5 transition"
      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition";

  const initial = userInfo?.name?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 md:px-10 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50 transition-colors duration-300">

      {/* BRAND */}
      <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:opacity-80 transition">
        Resume Analyzer
      </Link>

      {/* CENTER NAV — desktop */}
      <div className="hidden md:flex gap-7 items-center font-medium text-sm">
        <NavLink to="/"             className={navCls}>Home</NavLink>
        <NavLink to="/upload"       className={navCls}>Analyze Resume</NavLink>
        <NavLink to="/cover-letter" className={navCls}>Cover Letter</NavLink>
        <NavLink to="/history"      className={navCls}>History</NavLink>
      </div>

      {/* RIGHT — desktop */}
      <div className="hidden md:flex items-center gap-4">
        {!userInfo ? (
          <>
            <NavLink to="/login"
              className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium transition">
              Sign In
            </NavLink>
            <Link to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition hover:shadow-lg hover:scale-105 duration-300">
              Get Started
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropRef}>

            {/* ✅ CLICK-BASED button — not hover */}
            <button
              onClick={() => setDropOpen(!dropOpen)}
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {initial}
              </div>
              <span className="font-medium text-sm text-gray-700 dark:text-gray-200 max-w-[110px] truncate">
                {userInfo.name}
              </span>
              <span className="text-gray-400 text-xs">{dropOpen ? "▲" : "▾"}</span>
            </button>

            {/* ✅ CLICK-BASED DROPDOWN — visible when dropOpen is true */}
            {dropOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden">

                {/* USER INFO */}
                <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <p className="text-xs text-gray-400 mb-0.5">Signed in as</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{userInfo.name}</p>
                  <p className="text-xs text-gray-400 truncate">{userInfo.email}</p>
                </div>

                <Link to="/dashboard" onClick={() => setDropOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  🏠 Dashboard
                </Link>

                <Link to="/history" onClick={() => setDropOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  📂 History
                </Link>

                <Link to="/settings" onClick={() => setDropOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  ⚙️ Settings
                </Link>

                <Link to="/edit-profile" onClick={() => setDropOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  🖼️ Edit Profile Picture
                </Link>

                {/* DARK MODE */}
                <button
                  onClick={toggleDark}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left"
                >
                  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>

                {/* ADMIN PANEL */}
                <Link to="/admin" onClick={() => setDropOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 transition font-semibold">
                  🛡️ Admin Panel
                </Link>

                {/* ✅ LOGOUT — always visible at the bottom */}
                <div className="border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 transition text-left"
                  >
                    🚪 Sign Out
                  </button>
                </div>

              </div>
            )}
          </div>
        )}
      </div>

      {/* MOBILE HAMBURGER */}
      <button
        className="md:hidden text-gray-600 dark:text-gray-300 text-2xl"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-5 flex flex-col gap-4 text-sm shadow-xl md:hidden z-40">
          <NavLink to="/"             className={navCls} onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/upload"       className={navCls} onClick={() => setMobileOpen(false)}>Analyze Resume</NavLink>
          <NavLink to="/cover-letter" className={navCls} onClick={() => setMobileOpen(false)}>Cover Letter</NavLink>
          <NavLink to="/history"      className={navCls} onClick={() => setMobileOpen(false)}>History</NavLink>

          {userInfo ? (
            <>
              <div className="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-3">
                <p className="text-xs text-gray-400">Signed in as <strong className="text-gray-700 dark:text-gray-200">{userInfo.name}</strong></p>
                <NavLink to="/dashboard"    className={navCls} onClick={() => setMobileOpen(false)}>🏠 Dashboard</NavLink>
                <NavLink to="/admin"        className={navCls} onClick={() => setMobileOpen(false)}>🛡️ Admin Panel</NavLink>
                <button onClick={toggleDark} className="text-left text-gray-700 dark:text-gray-300 font-medium w-full">
                  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
                <button onClick={logout} className="text-left text-red-500 font-semibold w-full">
                  🚪 Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-3">
              <NavLink to="/login"    className={navCls} onClick={() => setMobileOpen(false)}>Sign In</NavLink>
              <Link to="/register" onClick={() => setMobileOpen(false)}
                className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-center font-semibold block">
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}

    </nav>
  );
}

export default Navbar;
