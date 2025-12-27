import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/userStore/userStore";

export default function ProtectedRoute() {
  const token = useUserStore((s) => s.getToken());
  const userInfo = useUserStore((s) => s.getUserInfo());

  const isAuthenticated = !!token;

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" replace />;
}
