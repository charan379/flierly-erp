import WithSuspense from "@/components/WithSuspense";
import Login from "@/modules/auth/pages/Login";
import SignUp from "@/modules/auth/pages/SignUp";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
      <Routes>
        {/* Default route, page under construction */}
        <Route path="/" element={<WithSuspense importPath={import("@/pages/PageUnderConstruction")} />} />
        
        {/* Login and Register routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        {/* Catch-all for 404 */}
        <Route path="*" element={<WithSuspense importPath={import("@/pages/PageNotFound")} />} />
      </Routes>
  );
};

export default AppRouter;
