import WithSuspense from "@/components/WithSuspense";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";
import { useRoutes } from "react-router-dom";

const AccountRoutes = () => {
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
          requiredPermissionRegex={/^account\.[a-z]+$/}
        />
      ),
    },
    {
      path: "accounts",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/Account")} />}
          requiredPermissionRegex={/^account\.[a-z]+$/}
        />
      ),
    },
    {
      path: "account-types",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/AccountType")} />}
          requiredPermissionRegex={/^account-type\.[a-z]+$/}
        />
      ),
    },
    {
      path: "account-subtypes",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/AccountSubtype")} />}
          requiredPermissionRegex={/^account-subtype\.[a-z]+$/}
        />
      ),
    },
  ]);
};

export default AccountRoutes;
