// App.js
import React, { Suspense } from "react";
import "@/assets/css/app.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import PageLoader from "@/components/PageLoader";
import store from "@/redux/store";
import AntdConfigProvider from "@/features/Theme/AntdConfigProvider";
import Routes from "@/router/Routes";

// App component that sets up routing, Redux store provider
function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Sets up the router context */}
      <Provider store={store}>
        {" "}
        {/* Provides the Redux store to the app */}
        <AntdConfigProvider>
          {" "}
          {/* Ant Design configuration provider */}
          <Routes /> {/* Application Routes */}
        </AntdConfigProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
