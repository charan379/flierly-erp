import Login from "@/pages/Login";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

/**
 * AuthRouter component to define the routes for authentication-related pages.
 *
 * @returns {JSX.Element} The rendered AuthRouter component with defined routes.
 */
const AuthRouter = () => {
  return (
    <Routes>
      {/* Route for the root path, rendering the Login component */}
      <Route element={<Login />} path="/" />
      {/* Route for the /login path, rendering the Login component */}
      <Route element={<Login />} path="/login" />
      {/* Route for the /logout path, redirecting to the /login path */}
      <Route element={<Navigate to="/login" replace />} path="/logout" />
    </Routes>
  );
};

export default AuthRouter;
