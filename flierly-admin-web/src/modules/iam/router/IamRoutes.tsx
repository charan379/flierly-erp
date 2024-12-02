import PageLoader from "@/components/PageLoader";
import WithSuspense from "@/components/WithSuspense";
import ProtectedRoute from "@/features/ProtectedRoute/ProtectedRoute";
import { QueryFieldConfig } from "@/features/QueryBuilder/QueryBuilder";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const QueryBuilder = React.lazy(() => import("@/features/QueryBuilder"));

const exampleConfig: QueryFieldConfig<Record<string, any>>[] = [
  {
    field: { label: "Category", namePath: "category" },
    conditions: [
      {
        condition: { label: "Equals To", namePath: "equalTo" },
        formField: {
          input: {
            type: "Select",
            options: [
              { label: "Electronics", value: "electronics" },
              { label: "Clothing", value: "clothing" },
            ],
          },
        },
      },
      {
        condition: { label: "Not Equals To", namePath: "notEqualTo" },
        formField: {
          input: {
            type: "Select",
            options: [
              { label: "Electronics", value: "electronics" },
              { label: "Clothing", value: "clothing" },
            ],
          },
        },
      },
    ],
  },
  {
    field: { label: "Price", namePath: "price" },
    conditions: [
      {
        condition: { label: "Greater Than", namePath: "greaterThan" },
        formField: { input: { type: "Number" } },
      },
      {
        condition: { label: "Less Than", namePath: "lessThan" },
        formField: { input: { type: "Number" } },
      },
      {
        condition: { label: "Between", namePath: "between" },
        formField: { input: { type: "NumberRange" } },
      },
    ],
  },
  {
    field: { label: "Availability", namePath: "availability" },
    conditions: [
      {
        condition: { label: "Equals", namePath: "equalTo" },
        formField: {
          input: {
            type: "Select",
            options: [
              { label: "In Stock", value: "in_stock" },
              { label: "Out of Stock", value: "out_of_stock" },
            ],
          },
        },
      },
    ],
  },
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
            element={<WithSuspense importPath={import("../pages/Test")} />}
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
