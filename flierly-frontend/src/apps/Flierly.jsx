import React, { Suspense } from "react";
import ErpApp from "./ErpApp";
import PageLoader from "@/components/PageLoader";
import AntdConfigProvider from "@/theme/AntdConfigProvider";
import AuthRouter from "@/router/AuthRouter";

const DefaultApp = () => {
  return (
    <AntdConfigProvider>
      <Suspense fallback={<PageLoader />}>
        <ErpApp />
      </Suspense>
    </AntdConfigProvider>
  );
};

function Flierly() {
  // return <DefaultApp />;

  return (
    <AntdConfigProvider>
        <AuthRouter />
    </AntdConfigProvider>
  );
}

export default Flierly;
