import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function RoleRoute({ children, role }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;

  const user = jwtDecode(token);
  return user.role === role ? children : <Navigate to="/dashboard" />;
}