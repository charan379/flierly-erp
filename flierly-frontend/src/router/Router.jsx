import React from "react";
import Routes from "./Routes";
import { Route } from "react-router-dom";

const AppRouter = () => {
  console.log(Routes)
  return (
    <Routes>
      <Routes>
        <Route path="/*" element={<Routes />} />
      </Routes>
    </Routes>
  );
};

export default AppRouter;
