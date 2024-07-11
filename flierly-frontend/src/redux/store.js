import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { localStorageHealthCheck } from "./statePersist";
import localeReducer from "./locale/reducer";

localStorageHealthCheck();

const rootReducer = combineReducers({
    locale: localeReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
