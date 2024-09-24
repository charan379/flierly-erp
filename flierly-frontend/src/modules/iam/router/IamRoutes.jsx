import WithSuspense from "@/components/WithSuspense";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";
import { useRoutes } from "react-router-dom";

const IamRoutes = () => {
  return useRoutes([
    {
      path: "users",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/Users")} />}
          requiredPermissionRegex={/^user\.[a-z]+$/}
        />
      ),
    },
    {
      path: "roles",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/Roles")} />}
          requiredPermissionRegex={/^role\.[a-z]+$/}
        />
      ),
    },
    {
      path: "privileges",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/Privileges")} />}
          requiredPermissionRegex={/^privilege\.[a-z]$/}
        />
      ),
    },
  ]);
};

export default IamRoutes;
