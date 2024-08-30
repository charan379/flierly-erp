import AppLayout from "@/layout";
import WithSuspense from "@/components/WithSuspense";
import React from "react";
import { useRoutes } from "react-router-dom";
import BranchRoutes from "@/modules/branch/router/BranchRoutes";
import CustomerRoutes from "@/modules/customer/router/CustomerRoutes";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <AppLayout />,
      shouldRevalidate: false,
      children: [
        {
          path: "customer/*",
          element: <CustomerRoutes />,
        },
        { path: "branch/*", element: <BranchRoutes /> },
        { path: '/unauthorized', element: <WithSuspense importPath={import("@/pages/PageUnAuthorized")} /> },
        { path: "*", element: <WithSuspense importPath={import("@/pages/PageNotFound")} /> },
      ],
    },
  ]);
};

export default Routes;
