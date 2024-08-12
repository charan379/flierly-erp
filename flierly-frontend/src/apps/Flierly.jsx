import React from "react";
import AntdConfigProvider from "@/theme/AntdConfigProvider";
import AuthRouter from "@/modules/auth/router/AuthRouter";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import AppRouter from "@/router/Router";

function Flierly() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <AntdConfigProvider>
        <AppRouter />
      </AntdConfigProvider>
    );
  } else {
    return (
      <AntdConfigProvider>
        <AuthRouter />
      </AntdConfigProvider>
    );
  }
}

export default Flierly;
