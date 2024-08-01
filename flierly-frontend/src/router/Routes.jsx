import AppLayout from "@/layout";
import WithSuspense from "@/components/WithSuspense";
import React from "react";
import { useRoutes } from "react-router-dom";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <AppLayout />,
      shouldRevalidate: false,
      children: [
        {
          path: "customer",
          element: <WithSuspense importPath={import("@/modules/customer/pages/Customers")} />,
        },
        {
          path: "*",
          element: <WithSuspense importPath={import("@/pages/PageNotFound")} />,
        },
      ],
    },
  ]);
};

export default Routes;
