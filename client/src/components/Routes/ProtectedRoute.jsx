import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const token = localStorage.getItem("principalToken");

  console.log("ProtectedRoute: Checking token for /principal route");
  console.log("Token present:", !!token);

  // If no token → redirect to login
  if (!token) {
    console.log("No token found, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  // If token exists → allow access
  console.log("Token found, allowing access");
  return <Outlet />;
};

export default ProtectedRoute;
