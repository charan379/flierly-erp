import React from "react";
import AntdConfigProvider from "@/features/Theme/AntdConfigProvider";
import Routes from "@/router/Routes";

function Flierly() {
  return (
    <AntdConfigProvider>
      <Routes />
    </AntdConfigProvider>
  );
}

export default Flierly;
