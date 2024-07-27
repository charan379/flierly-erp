import React, { Suspense } from "react";
import ErpApp from "./ErpApp";
import PageLoader from "@/components/PageLoader";
import AntdConfigProvider from "@/theme/AntdConfigProvider";
import AuthRouter from "@/modules/auth/router/AuthRouter";
import { useAuth } from "@/modules/auth/hooks/useAuth";

const App = () => {
  return (
    <AntdConfigProvider>
      <Suspense fallback={<PageLoader />}>
        <ErpApp />
      </Suspense>
    </AntdConfigProvider>
  );
};

function Flierly() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <App />;
  } else {
    return (
      <AntdConfigProvider>
        <AuthRouter />
      </AntdConfigProvider>
    );
  }
}

export default Flierly;
