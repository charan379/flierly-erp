import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoadingTypes } from "../@types/loading";
import authService from "../service/authService";
import { RootState } from "@/redux/store";

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

// Create the authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    // LOGOUT reducer
    logout: (state) => {
      state.user = null;
      state.allowedAccess = [];
      state.token = "";
      state.loggedInAt = "";
      state.tokenExpiresAt = "";
      state.isLoggedIn = false;
      state.loading = LoadingTypes.IDLE;
      state.error = null;
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    // LOGIN async thunk within slice
    builder
      .addCase(login.pending, (state) => {
        state.loading = LoadingTypes.PENDING;
        state.error = null;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload?.error;
        state.loading = LoadingTypes.FAILED;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        const { user, allowedAccess, token, loggedInAt, tokenExpiresAt } = action.payload?.result;
        state.loading = LoadingTypes.SUCCEEDED;
        state.user = user;
        state.allowedAccess = allowedAccess;
        state.token = token;
        state.loggedInAt = loggedInAt;
        state.tokenExpiresAt = tokenExpiresAt;
        state.isLoggedIn = true;
        localStorage.setItem("auth", JSON.stringify(state));
      });

    // REFRESH async thunk within slice
    builder
      .addCase(refresh.pending, (state) => {
        state.loading = LoadingTypes.REFRESHING;
      })
      .addCase(refresh.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload?.error;
        state.loading = LoadingTypes.FAILED;
      })
      .addCase(refresh.fulfilled, (state, action: PayloadAction<any>) => {
        const { user, allowedAccess, token, tokenExpiresAt } = action.payload?.result;
        state.loading = LoadingTypes.SUCCEEDED;
        state.user = user;
        state.allowedAccess = allowedAccess;
        state.token = token;
        state.tokenExpiresAt = tokenExpiresAt;
        localStorage.setItem("auth", JSON.stringify(state));
      });
  },
});

// LOGIN async action
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    const res = await authService.login(credentials);

    if (res?.success === false) {
      return thunkAPI.rejectWithValue(res);
    }
    return res;
  }
);

// REFRESH async action
export const refresh = createAsyncThunk(
  "auth/refresh",
  async (currentToken: string | undefined, thunkAPI) => {
    let token = currentToken || (thunkAPI.getState() as RootState).auth.token;

    const res = await authService.refreshToken({ currentToken: token });

    if (res?.success === false) {
      return thunkAPI.rejectWithValue(res);
    }
    return res;
  }
);

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export default authSlice;
