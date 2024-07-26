import { createAsyncSlice } from "@/redux/createAsyncSlice";
import statePersist from "@/redux/statePersist";
import { loadingTypes } from "@/types/loading";
import * as authService from "../../service";

// Initial state for the auth slice
const INITIAL_STATE = {
  user: {},
  token: "",
  loggedInAt: "",
  tokenExpiresAt: "",
  isLoggedIn: false,
  loading: loadingTypes.IDLE,
};

// Fetching the persisted state from localStorage if available
const PERSISTING_STATE = statePersist.get("auth");

/**
 * Slice for managing authentication state
 */
const slice = createAsyncSlice({
  name: "auth",
  initialState: PERSISTING_STATE ? PERSISTING_STATE : INITIAL_STATE,
  reducers: (create) => ({
    // LOGIN
    LOGIN: create.asyncThunk(
      async (credentials, thunkApi) => {
        const res = await authService.login(credentials);
        if (res?.success === false) throw thunkApi.rejectWithValue(res);
        return res;
      },
      {
        pending: (state) => {
          state["loading"] = loadingTypes.PENDING;
        },
        rejected: (state) => {
          state["loading"] = loadingTypes.FAILED;
          state["user"] = {};
          state["token"] = "";
          state["loggedInAt"] = "";
          state["tokenExpiresAt"] = "";
          state["isLoggedIn"] = false;
        },
        fulfilled: (state, action) => {
          state["loading"] = loadingTypes.SUCCEEDED;
          state["user"] = action.payload.result.user;
          state["token"] = action.payload.result.token;
          state["loggedInAt"] = action.payload.result.loggedInAt;
          state["tokenExpiresAt"] = action.payload.result.tokenExpiresAt;
          state["isLoggedIn"] = true;
        },
      }
    ),
  }),
});

// Exporting the auth slice as the default export
export default slice;
