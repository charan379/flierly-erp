import { useDispatch, useSelector } from "react-redux";
import { RESET, CHANGE_LANGUAGE, CHANGE_LANG_DIRECTION } from "./actions";
import getTranslation from "@/utils/getTranslation";

/**
 * Custom hook to handle locale-related functionality using Redux.
 * 
 * @returns {Object} An object containing locale state, language direction, translation function, and action dispatchers.
 */
export default function useLocale() {
  // Accessing locale state from Redux store
  const locale = useSelector((state) => state.locale);

  // Accessing dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Return an object with relevant locale information and actions
  return {
    // Current locale state
    locale,

    // Current language code
    langCode: locale.langCode,

    // Current language direction
    langDirection: locale.langDirection,

    // Current theme 
    themeMode: locale.theme,

    /**
     * Translates a given key using the current locale's language translation data.
     * 
     * @param {string} value - The key to translate.
     * @returns {string} The translated string if available, otherwise returns the key itself wrapped in curly braces.
     */
    translate: (value) => getTranslation(locale.translation, value),

    /**
     * Resets the locale state to its initial values.
     */
    resetLocale: () => dispatch(RESET()),

    /**
     * Changes the language to the specified language code.
     * 
     * @param {string} langCode - The language code to change to.
     */
    changeLanguage: (langCode) => dispatch(CHANGE_LANGUAGE(langCode)),

    /**
     * Changes the language direction (ltr or rtl).
     * 
     * @param {string} direction - The new language direction.
     */
    changeLangDirection: (direction) => dispatch(CHANGE_LANG_DIRECTION(direction)),
  };
}
