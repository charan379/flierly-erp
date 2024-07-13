import statePersist from "../statePersist";
import { createSlice } from "@reduxjs/toolkit";
import languages from "@/locale/languages";

// Initial state for the locale slice
const INITIAL_STATE = {
  result: languages["en_us"], // Default language is English (US)
  langCode: "en_us", // Default language code
  langDirection: "ltr", // Default language direction is left-to-right
  isLoading: false, // Loading state
  isSuccess: false, // Success state
};

// Fetching the persisted state from localStorage if available
const PERSISTING_STATE = statePersist.get("locale");

/**
 * Slice for managing locale state.
 */
const slice = createSlice({
  // Name of the slice
  name: "locale",
  // Initial state of the slice, either persisted state or default initial state
  initialState: PERSISTING_STATE ? PERSISTING_STATE : INITIAL_STATE,
  // Reducers to handle state changes
  reducers: {
    /**
     * Reducer to change the language.
     * 
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object.
     * @param {string} action.payload - The new language code to switch to.
     */
    CHANGE_LANGUAGE: (state, action) => {
      const LANG_CODE = action.payload.toLowerCase();
      // Change Language
      if (languages.hasOwnProperty(LANG_CODE)) {
        state["result"] = languages[LANG_CODE];
        state["langCode"] = LANG_CODE;
        state["isSuccess"] = true;
      } else {
        state["isSuccess"] = false;
      }
      // Persisting the state in localStorage
      window.localStorage.setItem("locale", JSON.stringify(state));
    },

    /**
     * Reducer to change the language direction.
     * 
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object.
     * @param {string} action.payload - The new language direction (ltr or rtl).
     */
    CHANGE_LANG_DIRECTION: (state, action) => {
      const langDir = action.payload.toLowerCase();
      // Change language direction
      if (["ltr", "rtl"].includes(langDir)) {
        state["langDirection"] = langDir;
        state["isSuccess"] = true;
      } else {
        state["isSuccess"] = false;
      }
      // Persisting the state in localStorage
      window.localStorage.setItem("locale", JSON.stringify(state));
    },

    /**
     * Reducer to reset the locale state to the initial state.
     * 
     * @param {Object} state - The current state of the slice.
     */
    RESET: (state) => {
      // Resetting each property to its initial value
      for (let [key, value] of Object.entries(INITIAL_STATE)) {
        if (state.hasOwnProperty(key)) {
          state[key] = value;
        }
      }
      state["isSuccess"] = true;
      // Persisting the state in localStorage
      window.localStorage.setItem("locale", JSON.stringify(state));
    },
  },
});

// Exporting the locale slice as the default export
export default slice;