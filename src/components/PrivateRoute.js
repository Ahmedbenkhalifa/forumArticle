import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuth, isLoading } = useSelector((state) => state.userReducer);
  if (!isAuth && !isLoading) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
const PrivateRouteAdmin = ({ children }) => {
  const { isAuth, isLoading } = useSelector((state) => state.userReducer);
  const role = useSelector((state) => state.userReducer.user?.role);
  if (role !== "ADMIN") {
    return <Navigate to="/" />;}
  if (!isAuth && !isLoading && role !== "ADMIN") {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export { PrivateRoute, PrivateRouteAdmin };
