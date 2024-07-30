import React from "react";
import Routes from "./Routes";
import { Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Routes>
        <Route path="/*" element={<Routes />} />
      </Routes>
    </Routes>
  );
};

export default AppRouter;
