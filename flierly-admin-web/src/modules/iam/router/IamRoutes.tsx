import PageLoader from "@/components/PageLoader";
import WithSuspense from "@/components/WithSuspense";
import ProtectedRoute from "@/features/ProtectedRoute/ProtectedRoute";
import { QueryCondition } from "@/features/QueryBuilder/QueryBuilder";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const QueryBuilder = React.lazy(() => import("@/features/QueryBuilder"));

const exampleConfig: QueryCondition[] = [
  {
    field: "Category",
    value: undefined,
    conditions: [
      { condition: "equals", formField: { input: { type: "Select", options: [{ label: "Electronics", value: "electronics" }, { label: "Clothing", value: "clothing" }] } } },
      { condition: "not equals", formField: { input: { type: "Select", options: [{ label: "Electronics", value: "electronics" }, { label: "Clothing", value: "clothing" }] } } }
    ]
  },
  {
    field: "Price",
    value: undefined,
    conditions: [
      { condition: "greater than", formField: { input: { type: "Number" } } },
      { condition: "less than", formField: { input: { type: "Number" } } }
    ]
  },
  {
    field: "Availability",
    value: undefined,
    conditions: [
      { condition: "equals", formField: { input: { type: "Select", options: [{ label: "In Stock", value: "in_stock" }, { label: "Out of Stock", value: "out_of_stock" }] } } }
    ]
  }
];


const IamRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route
        path=""
        element={
          <ProtectedRoute
            // element={<WithSuspense importPath={import("@/pages/PageUnderConstruction")} />}
            element={<Suspense fallback={<PageLoader />}>
              <QueryBuilder config={exampleConfig} />
            </Suspense>}
            requiredPermissionRegex={/^user\.[a-z]+$/}
          />
        }
      />

      {/* Users route */}
      <Route
        path="users"
        element={
          <ProtectedRoute
            element={<WithSuspense importPath={import("@/pages/PageUnderConstruction")} />}
            requiredPermissionRegex={/^user\.[a-z]+$/}
          />
        }
      />

      {/* Roles route */}
      <Route
        path="roles"
        element={
          <ProtectedRoute
            element={<WithSuspense importPath={import("@/pages/PageUnderConstruction")} />}
            requiredPermissionRegex={/^role\.[a-z]+$/}
          />
        }
      />

      {/* Privileges route */}
      <Route
        path="privileges"
        element={
          <ProtectedRoute
            element={<WithSuspense importPath={import("../pages/Privileges")} />}
            requiredPermissionRegex={/^privilege\.[a-z]+$/}
          />
        }
      />
    </Routes>
  );
};

export default IamRoutes;
