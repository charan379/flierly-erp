import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { localStorageHealthCheck } from "./statePersist";

localStorageHealthCheck();

const rootReducer = combineReducers({

});

const store = configureStore({
    reducer: rootReducer,
    devTools: true
})

export default store;