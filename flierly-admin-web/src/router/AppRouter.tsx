import WithSuspense from "@/components/WithSuspense";
import ProtectedRoute from "@/features/ProtectedRoute/ProtectedRoute";
import Dashboard from "@/layout/Dashboard";
import Login from "@/modules/auth/pages/Login";
import SignUp from "@/modules/auth/pages/SignUp";
import IamRoutes from "@/modules/iam/router/IamRoutes";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      {/* Default route, page under construction */}
      <Route path="/" element={<WithSuspense importPath={import("@/pages/PageUnderConstruction")} />} />

      <Route path="/erp" element={<ProtectedRoute element={<Dashboard />} />}>
        <Route path="" element={<WithSuspense importPath={import("@/pages/PageUnderConstruction")} />} />
        <Route path="iam/*" element={<IamRoutes />} />
      </Route>
      {/* Login and Register routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />

      {/* Catch-all for 404 */}
      <Route path="*" element={<WithSuspense importPath={import("@/pages/PageNotFound")} />} />
    </Routes>
  );
};

export default AppRouter;
