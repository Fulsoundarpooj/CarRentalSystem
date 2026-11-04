import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ role }) => {
//   const userRole = localStorage.getItem("role");

//   if (!userRole || userRole !== role) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />; // Important: renders nested child routes
// };

// export default ProtectedRoute;

const ProtectedRoute = ({ role }) => {
  const userRole = localStorage.getItem("role");

  if (!userRole || userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
