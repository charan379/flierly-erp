import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import statePersist from "@/redux/statePersist";

// Initial state for the theme slice
const INITIAL_STATE: ThemeState = {
  mode: "", // Default theme mode is unset
  preference: "system", // Default theme preference is 'system'
  compact: true, // Default compact mode is enabled
};

// Fetch persisted state from localStorage if available
const PERSISTING_STATE: ThemeState | null = statePersist.get<ThemeState>("theme") || null;

// Utility function to persist state to localStorage
const persistThemeState = (state: ThemeState) => {
  window.localStorage.setItem("theme", JSON.stringify(state));
};

// Create the theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState: PERSISTING_STATE ?? INITIAL_STATE, // Use persisted state or fallback to the initial state
  reducers: {
    /**
     * Changes the theme mode.
     * @param state - The current state of the slice.
     * @param action - The payload contains the new theme mode.
     */
    CHANGE_THEME_MODE: (state, action: PayloadAction<"light" | "dark">) => {
      const newTheme = action.payload.toLowerCase();
      if (["light", "dark"].includes(newTheme)) {
        state.mode = newTheme as "light" | "dark";
        persistThemeState(state);
      }
    },

    /**
     * Changes the theme preference.
     * @param state - The current state of the slice.
     * @param action - The payload contains the new theme preference.
     */
    CHANGE_THEME_PREFERENCE: (state, action: PayloadAction<ThemePreference>) => {
      const newPreference = action.payload.toLowerCase();
      if (["light", "dark", "system"].includes(newPreference)) {
        state.preference = newPreference as ThemePreference;
        persistThemeState(state);
      }
    },

    /**
     * Toggles the compact mode.
     * @param state - The current state of the slice.
     */
    TOGGLE_THEME_COMPACTIBILITY: (state) => {
      state.compact = !state.compact;
      persistThemeState(state);
    },
  },
});

// Export the actions and reducer
export const { CHANGE_THEME_MODE, CHANGE_THEME_PREFERENCE, TOGGLE_THEME_COMPACTIBILITY } = themeSlice.actions;
// Theme Reducer
export const themeReducer = themeSlice.reducer;

export default themeSlice.reducer;
