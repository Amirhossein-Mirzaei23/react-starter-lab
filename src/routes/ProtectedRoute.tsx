import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../stores/userStore/userStore';

export default function ProtectedRoute() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated());

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" replace />;
}
