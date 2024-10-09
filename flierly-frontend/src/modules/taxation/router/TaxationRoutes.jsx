import WithSuspense from "@/components/WithSuspense";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";
import { useRoutes } from "react-router-dom";

const TaxationRoutes = () => {
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
          requiredPermissionRegex={/^tax*\.[a-z]+$/}
        />
      ),
    },
    {
      path: "tax-identities",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/TaxIdentities")} />}
          requiredPermissionRegex={/^tax-identity\.[a-z]+$/}
        />
      ),
    },
  ]);
};

export default TaxationRoutes;
