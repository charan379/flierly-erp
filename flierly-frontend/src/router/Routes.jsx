import React from "react";
import { useRoutes } from "react-router-dom";
import WithSuspense from "@/components/WithSuspense";
import BranchRoutes from "@/modules/branch/router/BranchRoutes";
import CustomerRoutes from "@/modules/customer/router/CustomerRoutes";
import Login from "@/modules/auth/pages/Login";
import Register from "@/modules/auth/pages/Register";
import Dashboard from "@/components/Dashboard";

const Routes = () => {
  return useRoutes([
    {
      index: true,
      element: (
        <WithSuspense importPath={import("@/pages/PageUnderConstruction")} />
      ),
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Register />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "",
          element: (
            <WithSuspense
              importPath={import("@/pages/PageUnderConstruction")}
            />
          ),
        },
        /* Protected routes using BranchRoutes and CustomerRoutes components */
        { path: "customer/*", element: <CustomerRoutes /> }, // Handle customer routes within CustomerRoutes component
        { path: "branch/*", element: <BranchRoutes /> }, // Handle branch routes within BranchRoutes component
        {
          path: "unauthorized",
          element: (
            <WithSuspense importPath={import("@/pages/PageUnAuthorized")} />
          ),
        },
        {
          path: "*",
          element: <WithSuspense importPath={import("@/pages/PageNotFound")} />,
        },
      ],
    },
    {
      path: "*",
      element: <WithSuspense importPath={import("@/pages/PageNotFound")} />,
    },
  ]);
};

export default Routes;
