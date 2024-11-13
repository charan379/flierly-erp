import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import AntdConfigProvider from "./features/Theme/AntdConfigProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Provider store={store}>
          <AntdConfigProvider>
            <App />
          </AntdConfigProvider>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
