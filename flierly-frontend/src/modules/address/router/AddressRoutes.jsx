import WithSuspense from "@/components/WithSuspense";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";
import { useRoutes } from "react-router-dom";

const AddressRoutes = () => {
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
          requiredPermissionRegex={/^address*\.[a-z]+$/}
        />
      ),
    },
    {
      path: "addresses",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/Addresses")} />}
          requiredPermissionRegex={/^address\.[a-z]+$/}
        />
      ),
    },
  ]);
};

export default AddressRoutes;
