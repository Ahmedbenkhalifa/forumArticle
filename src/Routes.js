import React from "react";
import { Routes as RoutesRouter, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { PrivateRoute, PrivateRouteAdmin } from "./components/PrivateRoute";
import Article from "./pages/Article/Article";
import DashboardAdmin from "./pages/DashboardAdmin";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Forgotpassword/Resetpassword";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResultSearch from "./pages/ResultSearch";
import Search from "./pages/Search";
import Verify from "./pages/Verify";

const Routes = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.slice(0, 10) !== "/dashboard" && <Navbar />}
      <RoutesRouter>
        <Route path="/" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRouteAdmin>
              <DashboardAdmin />
            </PrivateRouteAdmin>
          }
        />
        <Route path="/search" element={<ResultSearch />} />
        <Route
          path="/article"
          element={
            <PrivateRoute>
              <Article />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/forgotPassword">
          <Route path="" element={<Forgotpassword />} />
          <Route path="resetPassword" element={<Resetpassword />} />
        </Route>
      </RoutesRouter>
    </>
  );
};

export { Routes };
