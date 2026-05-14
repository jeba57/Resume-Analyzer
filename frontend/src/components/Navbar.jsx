import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] =
    useState(false);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");

    navigate("/");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);

    document.documentElement.classList.toggle(
      "dark"
    );
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 border-b-2 border-blue-600 pb-1 transition"
      : "text-gray-700 hover:text-blue-600 transition";

  return (
    <nav className="bg-white border-b border-gray-200 px-10 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">

      {/* LOGO */}
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600"
      >
        Resume Analyzer
      </Link>

      {/* CENTER NAV */}
      <div className="flex gap-8 items-center font-medium">

        <NavLink
          to="/"
          className={navLinkClass}
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={navLinkClass}
        >
          Resume Score
        </NavLink>

        <NavLink
          to="/builder"
          className={navLinkClass}
        >
          Resume Builder
        </NavLink>

        <NavLink
          to="/cover-letter"
          className={navLinkClass}
        >
          Cover Letter AI
        </NavLink>

        {userInfo && (
          <>
            

            <NavLink
              to="/history"
              className={navLinkClass}
            >
              History
            </NavLink>
          </>
        )}

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {!userInfo ? (
          <>
            <NavLink
              to="/login"
              className={navLinkClass}
            >
              Sign In
            </NavLink>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            <NavLink
              to="/admin"
              className="text-purple-600 font-medium hover:text-purple-700"
            >
              Admin Panel
            </NavLink>

            <div className="relative group">

              <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition">

                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {userInfo.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <span className="font-medium">
                  {userInfo.name}
                </span>

              </button>

              {/* DROPDOWN */}
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">

                <Link
                  to="/profile"
                  className="block px-5 py-3 hover:bg-gray-100 transition"
                >
                  My Profile
                </Link>

                <Link
                  to="/settings"
                  className="block px-5 py-3 hover:bg-gray-100 transition"
                >
                  Settings
                </Link>

                <button
                  onClick={toggleTheme}
                  className="w-full text-left px-5 py-3 hover:bg-gray-100 transition"
                >
                  {darkMode
                    ? "☀️ Light Mode"
                    : "🌙 Dark Mode"}
                </button>

                <button
                  onClick={logoutHandler}
                  className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </button>

              </div>

            </div>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;