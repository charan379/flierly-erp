import React, { useLayoutEffect } from "react";
import AntdConfigProvider from "@/theme/AntdConfigProvider";
import AuthRouter from "@/modules/auth/router/AuthRouter";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import AppRouter from "@/router/Router";
import { useNavigate } from "react-router-dom";
import { loadingTypes } from "@/types/loading";

function Flierly() {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (loading === loadingTypes.SUCCEEDED) {
      navigate("/");
    }
  }, [loading]);

  return (
    <AntdConfigProvider>
      {isLoggedIn ? <AppRouter /> : <AuthRouter />}
    </AntdConfigProvider>
  );
}

export default Flierly;
