import WithSuspense from "@/components/WithSuspense";
import React from "react";
import { useRoutes } from "react-router-dom";

const BranchRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <WithSuspense importPath={import("@/pages/PageNotFound")} />,
    },
    {
      path: "/list",
      element: <WithSuspense importPath={import("../pages/Branch")} />,
    },
  ]);
};

export default BranchRoutes;
