import React from "react";
import { useRoutes } from "react-router-dom";
import WithSuspense from "@/components/WithSuspense";
import BranchRoutes from "@/modules/branch/router/BranchRoutes";
import CustomerRoutes from "@/modules/customer/router/CustomerRoutes";
import Login from "@/modules/auth/pages/Login";
import Register from "@/modules/auth/pages/Register";
import Dashboard from "@/components/Dashboard";
import IamRoutes from "@/modules/iam/router/IamRoutes";
import AccountRoutes from "@/modules/account/router/AccountRoutes";
import TaxationRoutes from "@/modules/taxation/router/TaxationRoutes";
import AddressRoutes from "@/modules/address/router/AddressRoutes";
import InventoryRoutes from "@/modules/inventory/router/InventoryRoutes";

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
      path: "erp",
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
        { path: "iam/*", element: <IamRoutes /> }, // Handle iam routes within IamRoutes module
        { path: "account/*", element: <AccountRoutes /> }, // Handle account routes within AccountRoutes module
        { path: "taxation/*", element: <TaxationRoutes /> }, // Handle taxation routes within Taxation module
        { path: "address/*", element: <AddressRoutes /> }, // Handle address routes within address module
        { path: "inventory/*", element: <InventoryRoutes /> }, // Handle inventory routes within inventory module
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
