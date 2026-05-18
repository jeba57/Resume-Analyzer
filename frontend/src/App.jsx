import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home         from "./pages/Home";
import Login        from "./pages/Login";
import Register     from "./pages/Register";
import Dashboard    from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import ATSResult    from "./pages/ATSResult";
import History      from "./pages/History";
import CoverLetter  from "./pages/CoverLetter";
import Admin        from "./pages/Admin";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/"         element={<Home />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route path="/upload"       element={<ProtectedRoute><UploadResume /></ProtectedRoute>} />
        <Route path="/result"       element={<ProtectedRoute><ATSResult /></ProtectedRoute>} />
        <Route path="/history"      element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/cover-letter" element={<ProtectedRoute><CoverLetter /></ProtectedRoute>} />
        <Route path="/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin"        element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
