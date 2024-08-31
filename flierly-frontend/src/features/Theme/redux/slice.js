import { createSlice } from "@reduxjs/toolkit";
import statePersist from "../../../redux/statePersist";

// Initial state for the locale slice.
const INITIAL_STATE = {
  mode: "", // Mode of theme 'dark' or 'light
  preference: "system", // Preference of theme 'light', 'dark' or 'system'-> defaults to 'system'
  compact: false, // boolean flag indicating whether the ant-compact mode is enabled
};

// Fetcing the persiste state from local storage if available
const PERSISTING_STATE = statePersist.get("theme");

/**
 * Slice for managing theme state
 */

const slice = createSlice({
  // Name of the slice
  name: "theme",
  // Initial state of the slice, either persisted state or default initial state
  initialState: PERSISTING_STATE ? PERSISTING_STATE : INITIAL_STATE,
  // Reducers to handle state changes
  reducers: {
    /**
     * Reducer to change the theme mode
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object.
     * @param {string} action.payload "light" | "dark" - The new theme code to switch to.
     */
    CHANGE_THEME_MODE: (state, action) => {
      const NEW_THEME = action.payload.toLowerCase();
      // Change theme
      if (["light", "dark"].includes(NEW_THEME)) {
        state["mode"] = NEW_THEME;
      }
      // Persisting the state in localStorage
      window.localStorage.setItem("theme", JSON.stringify(state));
    },

    /**
     * Reducer to change the theme preference
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object.
     * @param {string} action.payload "light" | "dark" | "system" - The new theme preference to switch to.
     */
    CHANGE_THEME_PREFERENCE: (state, action) => {
      const NEW_PREFERENCE = action.payload.toLowerCase();
      // Change preference
      if (["light", "dark", "system"].includes(NEW_PREFERENCE)) {
        state["preference"] = NEW_PREFERENCE;
      }
      // Persisting the state in localStorage
      window.localStorage.setItem("theme", JSON.stringify(state));
    },

    /**
     * Reducer to toggle compactibility mode
     * @param {Object} state - The current state of the slice.
     */
    TOGGLE_THEME_COMPACTIBILITY: (state) => {
      state["compact"] = !state["compact"];
      // Persisting the state in localStorage
      window.localStorage.setItem("theme", JSON.stringify(state));
    },
  },
});

// Exporting the locale slice as the default export
export default slice;
