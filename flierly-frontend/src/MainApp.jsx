import './styles/app.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { lazy, Suspense } from 'react';
import PageLoader from '@/components/PageLoader';
import store from '@/redux/store';

const Flierly = lazy(() => new Promise((resolve) => {
  setTimeout(() => resolve(import('@/apps/Flierly')), 3000)
}))

function MainApp() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<PageLoader />} >
          <Flierly />
        </Suspense>
      </Provider>
    </BrowserRouter>
  )
}

export default MainApp
