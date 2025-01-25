import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './modules/core/components/ErrorFallback/index.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store.ts'
import AntdConfigProvider from './modules/core/features/Theme/AntdConfigProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <AntdConfigProvider>
            <App />
          </AntdConfigProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
