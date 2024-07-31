import PageLoader from "@/components/PageLoader";
import React, { Suspense } from "react";

const WithSuspense = ({ importPath, timeOut = 0 }) => {
  const LazyComponent = React.lazy(
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(importPath), timeOut);
      })
  );
  return (
    <Suspense fallback={<PageLoader />}>
      <LazyComponent />
    </Suspense>
  );
};

export default WithSuspense;
