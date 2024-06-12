import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <>Loading...</>;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to={"/"} replace />;
};
