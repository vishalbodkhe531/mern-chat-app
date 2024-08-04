import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { authUser } = useAuthContext();

  return authUser ? <Outlet /> : <Navigate to={"/sign-in"} />;
}

export default PrivateRoute;
