import WithSuspense from "@/components/WithSuspense";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";
import { useRoutes } from "react-router-dom";

const BranchRoutes = () => {
  return useRoutes([
    {
      path: "",
      element: <ProtectedRoute element={<WithSuspense importPath={import("@/pages/PageUnderConstruction")} />} requiredPermission='branch.read' />,
    },
    {
      path: "list",
      element: <ProtectedRoute element={<WithSuspense importPath={import("../pages/Branch")} />} requiredPermission='branch.read' />,
    },
  ]);
};

export default BranchRoutes;
