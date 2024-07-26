import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { localStorageHealthCheck } from "./statePersist";
import localeReducer from "./locale/reducer";
import themeReducer from "./theme/reducer";
import authReducer from "@/modules/auth/redux/auth/reducer";

// Performing a health check for localStorage state persistence
localStorageHealthCheck();

/**
 * Combines all the reducers into a single root reducer.
 */
const rootReducer = combineReducers({
  locale: localeReducer,
  theme: themeReducer,
  auth: authReducer,
});

/**
 * Configures the Redux store with the root reducer and enables Redux DevTools.
 *
 * @returns {Object} The configured Redux store.
 */
const store = configureStore({
  reducer: rootReducer,
  devTools: true, // Enables Redux DevTools extension
});

export default store;
