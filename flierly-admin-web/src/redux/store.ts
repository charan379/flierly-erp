import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { localStorageHealthCheck } from './state-persist'
import { authReducer } from '@/modules/auth/redux/auth.slice'
import { localeReducer } from '@/modules/core/features/Locale/redux/locale.slice'
import { themeReducer } from '@/modules/core/features/Theme/redux/theme.slice'
import { branchSelectorReducer } from '@/modules/organization/features/BranchSelector/redux/branch-selector.slice'

// Performing a health check for localStorage state persistence
localStorageHealthCheck()

/**
 * Combines all the reducers into a single root reducer.
 */
const rootReducer = combineReducers({
  locale: localeReducer,
  auth: authReducer,
  theme: themeReducer,
  branch: branchSelectorReducer,
})

/**
 * Configures the Redux store with the root reducer and enables Redux DevTools.
 *
 * @returns {Store<RootState>} The configured Redux store.
 */
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools only in non-production environments
})

// Define the type for the root state
export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export default store
