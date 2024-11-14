import WithSuspense from "@/components/WithSuspense";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";
import { useRoutes } from "react-router-dom";

const IamRoutes = () => {
  return useRoutes([
    {
      path: "users",
      element: <ProtectedRoute element={<WithSuspense importPath={import("../pages/Users")} />} requiredPermission='user.read' />,
    },
    {
      path: "roles",
      element: <ProtectedRoute element={<WithSuspense importPath={import("../pages/Roles")} />} requiredPermission='role.read' />,
    },
    {
     path: "privileges",
     element: <ProtectedRoute element={<WithSuspense importPath={import("../pages/Privileges")} />} requiredPermission='privilege.read' />,
    },
  ]);
};

export default IamRoutes;
