import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

export function ProtectedRoute({ children, allowedRoles }) {
  const user = useAuthStore((state) => state.user);

  // PUBLIC ROUTE
  if (allowedRoles.includes("Public")) return children;

  // NOT LOGGED IN OR ROLE MISMATCH
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
