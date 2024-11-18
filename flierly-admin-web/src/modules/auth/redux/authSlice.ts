import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoadingTypes } from "../@types/loading";
import authService from "../service/authService";

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

// LOGIN async action
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const res = await authService.login(credentials);
      if (res?.success === false) {
        return thunkAPI.rejectWithValue(res);
      }
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: "Login failed" });
    }
  }
);

// REFRESH async action
export const refresh = createAsyncThunk(
  "auth/refresh",
  async (currentToken: string | undefined, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const token = currentToken || state?.auth?.token;

    try {
      const res = await authService.refreshToken({ currentToken: token });
      if (res?.success === false) {
        return thunkAPI.rejectWithValue(res);
      }
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: "Token refresh failed" });
    }
  }
);

// Create the authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state) => {
      Object.assign(state, INITIAL_STATE); // Reset state to initial values
      clearAuthFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = LoadingTypes.PENDING;
        state.error = null;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        Object.assign(state, {
          user: null,
          allowedAccess: [],
          token: "",
          loggedInAt: "",
          tokenExpiresAt: "",
          isLoggedIn: false,
          loading: LoadingTypes.FAILED,
          error: action.payload?.error || "Login failed"
        });
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        const { user, allowedAccess, token, loggedInAt, tokenExpiresAt } =
          action.payload?.result;
        Object.assign(state, {
          user,
          allowedAccess,
          token,
          loggedInAt,
          tokenExpiresAt,
          isLoggedIn: true,
          loading: LoadingTypes.SUCCEEDED,
        });
        saveAuthToLocalStorage(state);
      })
      .addCase(refresh.pending, (state) => {
        state.loading = LoadingTypes.REFRESHING;
      })
      .addCase(refresh.rejected, (state, action: PayloadAction<any>) => {
        Object.assign(state, {
          user: null,
          allowedAccess: [],
          token: "",
          loggedInAt: "",
          tokenExpiresAt: "",
          isLoggedIn: false,
          loading: LoadingTypes.FAILED,
          error: action.payload?.error || "Token refresh failed"
        });
      })
      .addCase(refresh.fulfilled, (state, action: PayloadAction<any>) => {
        const { user, allowedAccess, token, tokenExpiresAt } =
          action.payload?.result;
        Object.assign(state, {
          user,
          allowedAccess,
          token,
          tokenExpiresAt,
          loading: LoadingTypes.SUCCEEDED,
        });
        saveAuthToLocalStorage(state);
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
