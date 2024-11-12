import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import languages, { getLanguageObject } from "../config/languages";
import statePersist from "@/redux/statePersist";

// Initial state for the locale slice
const INITIAL_STATE: LocaleState = {
    translation: languages.te_in, // Default language is English (US)
    langCode: "te_in", // Default language code
    langDirection: "ltr", // Default language direction is left-to-right
};

// Fetching the persisted state from localStorage if available
const PERSISTING_STATE: LocaleState | null = statePersist.get<LocaleState>("locale") || null;

/**
 * Slice for managing locale state.
 */
const localeSlice = createSlice({
    name: "locale",
    initialState: PERSISTING_STATE ?? INITIAL_STATE, // Use persisted state or fallback to the initial state
    reducers: {
        /**
         * Changes the language and updates the state.
         * @param state - The current state of the slice.
         * @param action - The payload contains the new language code.
         */
        CHANGE_LANGUAGE: (state, action: PayloadAction<string>) => {
            const langCode = action.payload.toLowerCase(); // Normalize to lowercase
            // Check if the language code exists in the `languages` object
            if (langCode in languages) {
                state.translation = getLanguageObject(langCode); // Get the translation object for the selected language
                state.langCode = langCode; // Update the language code
                // Persist the new locale state to localStorage
                window.localStorage.setItem("locale", JSON.stringify(state));
            }
        },

        /**
         * Changes the text direction (LTR or RTL).
         * @param state - The current state of the slice.
         * @param action - The payload contains the new text direction.
         */
        CHANGE_LANG_DIRECTION: (state, action: PayloadAction<"ltr" | "rtl">) => {
            state.langDirection = action.payload; // Update text direction
            // Persist the updated state to localStorage
            window.localStorage.setItem("locale", JSON.stringify(state));
        },

        /**
         * Resets the locale state to the initial values.
         * @param state - The current state of the slice.
         */
        RESET: (state) => {
            // Reset the state to the initial state
            Object.assign(state, INITIAL_STATE);
            // Persist the reset state to localStorage
            window.localStorage.setItem("locale", JSON.stringify(state));
        },
    },
});

export default localeSlice;
