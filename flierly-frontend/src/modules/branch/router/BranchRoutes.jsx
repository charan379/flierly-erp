import WithSuspense from "@/components/WithSuspense";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";
import { useRoutes } from "react-router-dom";

const BranchRoutes = () => {
  return useRoutes([
    {
      path: "",
      element: (
        <ProtectedRoute
          element={
            <WithSuspense
              importPath={import("@/pages/PageUnderConstruction")}
            />
          }
          requiredPermissionRegex={/^branch\.[a-z]+$/}
        />
      ),
    },
    {
      path: "list",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/Branch")} />}
          requiredPermissionRegex={/^branch\.[a-z]+$/}
        />
      ),
    },
  ]);
};

export default BranchRoutes;
