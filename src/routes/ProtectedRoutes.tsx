import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { currentUser } = useContext(UserContext);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
