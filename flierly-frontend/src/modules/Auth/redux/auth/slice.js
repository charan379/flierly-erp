import { createAsyncSlice } from "@/redux/createAsyncSlice";
import statePersist from "@/redux/statePersist";
import { loadingTypes } from "@/types/loading";
import * as authService from "../../service";

// Define the initial state for the authentication slice
const INITIAL_STATE = {
  user: {}, // Holds user details
  token: "", // Authentication token
  loggedInAt: "", // Timestamp when the user logged in
  tokenExpiresAt: "", // Timestamp when the token expires
  isLoggedIn: false, // Indicates if the user is logged in
  loading: loadingTypes.IDLE, // Indicates the current loading state
};

// Retrieve persisted state from localStorage if available
const PERSISTING_STATE = statePersist.get("auth");

/**
 * Creates and exports the authentication slice
 */
const slice = createAsyncSlice({
  name: "auth",
  initialState: PERSISTING_STATE ? PERSISTING_STATE : INITIAL_STATE,
  reducers: (create) => ({
    // LOGIN async thunk to handle user login
    LOGIN: create.asyncThunk(
      async (credentials, thunkApi) => {
        // Call the login service with credentials
        const res = await authService.login(credentials);

        // Check if the response indicates failure
        if (res?.success === false) {
          throw thunkApi.rejectWithValue(res); // Reject the thunk with the response payload
        }

        // Return the response on success
        return res;
      },
      {
        // Handle the loading state while the async thunk is pending
        pending: (state) => {
          state.loading = loadingTypes.PENDING;
        },
        // Handle errors when the async thunk is rejected
        rejected: (state) => {
          state.user = {};
          state.token = "";
          state.loggedInAt = "";
          state.tokenExpiresAt = "";
          state.isLoggedIn = false;
          state.loading = loadingTypes.FAILED;
        },
        // Handle success when the async thunk is fulfilled
        fulfilled: (state, action) => {
          const { user, token, loggedInAt, tokenExpiresAt } =
            action.payload.result;

          state.loading = loadingTypes.SUCCEEDED;
          state.user = user;
          state.token = token;
          state.loggedInAt = loggedInAt;
          state.tokenExpiresAt = tokenExpiresAt;
          state.isLoggedIn = true;
        },
        settled: (state) => {
          // Persisting the state in localStorage
          window.localStorage.setItem("auth", JSON.stringify(state));
        },
      }
    ),
  }),
});

export default slice;
