import '@/styles/app.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { lazy, Suspense } from 'react';
import PageLoader from '@/components/PageLoader';
import store from '@/redux/store';

// Using lazy to dynamically import the Flierly component with a simulated delay of 3 seconds
const Flierly = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("@/apps/Flierly")), 3000);
    })
);

// MainApp component that sets up routing, Redux store provider, and lazy loading for Flierly component
function MainApp() {
  return (
    <BrowserRouter> {/* Sets up the router context */}
      <Provider store={store}> {/* Provides the Redux store to the app */}
        <Suspense fallback={<PageLoader />}> {/* Suspense to show a loader while Flierly component is being loaded */}
          <Flierly /> {/* Lazy loaded Flierly App */}
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}

export default MainApp
