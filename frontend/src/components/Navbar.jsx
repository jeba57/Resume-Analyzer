import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">
        Resume Analyzer
      </h1>

      <div className="flex gap-7 text-lg">
        <Link
          to="/"
          className="hover:text-blue-600 transition"
        >
          Home
        </Link>

        <Link
          to="/login"
          className="hover:text-blue-600 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="hover:text-blue-700 transition"
        >
          Register
        </Link>

        <Link
          to="/dashboard"
          className="hover:text-blue-600 transition"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;