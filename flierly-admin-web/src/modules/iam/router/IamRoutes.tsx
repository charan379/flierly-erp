import ProtectedRoute from "@/features/ProtectedRoute/ProtectedRoute";
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const PageUnderConstruction = lazy(() => import("@/pages/PageUnderConstruction"));
const Privileges = lazy(() => import("../pages/Privileges"));

const IamRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route
        path=""
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PageUnderConstruction />
              </Suspense>
            }
            requiredPermissionRegex={/^user\.[a-z]+$/}
          />
        }
      />

      {/* Users route */}
      <Route
        path="users"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PageUnderConstruction />
              </Suspense>
            }
            requiredPermissionRegex={/^user\.[a-z]+$/}
          />
        }
      />

      {/* Roles route */}
      <Route
        path="roles"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PageUnderConstruction />
              </Suspense>
            }
            requiredPermissionRegex={/^role\.[a-z]+$/}
          />
        }
      />

      {/* Privileges route */}
      <Route
        path="privileges"
        element={
          <ProtectedRoute
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Privileges />
              </Suspense>
            }
            requiredPermissionRegex={/^privilege\.[a-z]+$/}
          />
        }
      />
    </Routes>
  );
};

export default IamRoutes;
