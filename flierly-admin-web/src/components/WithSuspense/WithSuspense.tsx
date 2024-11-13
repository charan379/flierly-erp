import React, { Suspense, ComponentType, LazyExoticComponent } from "react";
import PageLoader from "../PageLoader/PageLoader";

// Define the type for the props that WithSuspense component will receive.
type WithSuspenseProps = {
  importPath: Promise<{ default: ComponentType<any> }>;
  timeOut?: number; // Optional timeOut property to delay the loading of the component.
};

// Functional component WithSuspense that takes props for dynamic import and an optional timeout.
const WithSuspense: React.FC<WithSuspenseProps> = ({ importPath, timeOut = 0 }) => {
  // Define a lazy-loaded component using React.lazy and a Promise.
  const LazyComponent: LazyExoticComponent<ComponentType<any>> = React.lazy(
    () =>
      new Promise((resolve) => {
        // Delay the resolution of the import by the specified timeout (default is 0).
        setTimeout(() => resolve(importPath), timeOut);
      })
  );

  return (
    // Use Suspense to wrap the lazy-loaded component and display a loading indicator until it's ready.
    <Suspense fallback={<PageLoader />}>
      {/* Render the lazy-loaded component once it has been loaded */}
      <LazyComponent />
    </Suspense>
  );
};

export default WithSuspense;
