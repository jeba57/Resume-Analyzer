import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (!userInfo.isAdmin) {
    alert("You are not authorized to access Admin Panel.");
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;