import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { secureStorage } from "@/utils/secureStorage";
import { ActiveSection } from "@/constant/navConstant";

// PrivateRoute for Student Dashboard
export const StudentPrivateRoute = ({ children }) => {
  const token = secureStorage.getItem("token");
  const user = secureStorage.getItem("user");
  const activeSection = secureStorage.getItem("activeSection") || ActiveSection.Students;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (activeSection !== ActiveSection.Students || user.role !== "student") {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

// PrivateRoute for School Dashboard
export const SchoolPrivateRoute = ({ children }) => {
  const token = secureStorage.getItem("token");
  const user = secureStorage.getItem("user");
  const activeSection = secureStorage.getItem("activeSection") || ActiveSection.Students;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (activeSection !== ActiveSection.School || user.role !== "school") {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};