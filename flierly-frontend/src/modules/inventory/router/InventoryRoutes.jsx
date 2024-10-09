import WithSuspense from "@/components/WithSuspense";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";
import { useRoutes } from "react-router-dom";

const InventoryRoutes = () => {
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
          requiredPermissionRegex={/^product*\.[a-z]+$/}
        />
      ),
    },
    {
      path: "products",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/Products")} />}
          requiredPermissionRegex={/^product\.[a-z]+$/}
        />
      ),
    },
    {
      path: "stocks",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/Stocks")} />}
          requiredPermissionRegex={/^stock\.[a-z]+$/}
        />
      ),
    },
    {
      path: "uoms",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/UOMs")} />}
          requiredPermissionRegex={/^uom\.[a-z]+$/}
        />
      ),
    },
    {
      path: "uom-conversions",
      element: (
        <ProtectedRoute
          element={<WithSuspense importPath={import("../pages/UOMConversions")} />}
          requiredPermissionRegex={/^uom-conversion\.[a-z]+$/}
        />
      ),
    },
  ]);
};

export default InventoryRoutes;
