import WithSuspense from "@/components/WithSuspense";
import ProtectedRoute from "@/features/ProtectedRoute/ProtectedRoute";
import React from "react";
import { Routes, Route } from "react-router-dom";

const IamRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route
        path=""
        element={
          <ProtectedRoute
            element={<WithSuspense importPath={import("@/pages/PageUnderConstruction")} />}
            requiredPermissionRegex={/^user\.[a-z]+$/}
          />
        }
      />

      {/* Users route */}
      <Route
        path="users"
        element={
          <ProtectedRoute
            element={<WithSuspense importPath={import("@/pages/PageUnderConstruction")} />}
            requiredPermissionRegex={/^user\.[a-z]+$/}
          />
        }
      />

      {/* Roles route */}
      <Route
        path="roles"
        element={
          <ProtectedRoute
            element={<WithSuspense importPath={import("@/pages/PageUnderConstruction")} />}
            requiredPermissionRegex={/^role\.[a-z]+$/}
          />
        }
      />

      {/* Privileges route */}
      <Route
        path="privileges"
        element={
          <ProtectedRoute
            element={<WithSuspense importPath={import("../pages/Privileges")} />}
            requiredPermissionRegex={/^privilege\.[a-z]+$/}
          />
        }
      />
    </Routes>
  );
};

export default IamRoutes;
