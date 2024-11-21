import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingTypes } from "../@types/loading";

// Initial state
const INITIAL_STATE: AuthState = {
  user: null,
  allowedAccess: [],
  token: "",
  loggedInAt: "",
  tokenExpiresAt: "",
  isLoggedIn: false,
  loading: LoadingTypes.IDLE,
  error: null,
};

// Utility for localStorage handling
const saveAuthToLocalStorage = (authState: AuthState) => {
  localStorage.setItem("auth", JSON.stringify(authState));
};

const clearAuthFromLocalStorage = () => {
  localStorage.removeItem("auth");
};


// Create the authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      Object.assign(state, action.payload);
      saveAuthToLocalStorage(state);
    },
    logout: (state) => {
      Object.assign(state, INITIAL_STATE); // Reset state to initial values
      clearAuthFromLocalStorage();
    },
    setLoading:(state, action: PayloadAction<LoadingTypes>) => {
      state.loading = action.payload;
      saveAuthToLocalStorage(state);      
    }
  },
});

export const { logout, setAuth, setLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
