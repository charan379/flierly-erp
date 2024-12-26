import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store' // Ensure AppDispatch is exported from your store file
import getTranslation from '../utils/getTranslation'
import { RESET, CHANGE_LANGUAGE, CHANGE_LANG_DIRECTION } from '../redux/localeSlice'

export default function useLocale() {
  // Accessing locale state from Redux store
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
  const locale = useTypedSelector((state) => state.locale)

  // Accessing typed dispatch function
  const dispatch = useDispatch<AppDispatch>()

  // Return an object with relevant locale information and actions
  return {
    // Current locale state
    locale,

    // Current language code
    langCode: locale.langCode,

    // Current language direction
    langDirection: locale.langDirection,

    /**
     * Translates a given key using the current locale's language translation data.
     *
     * @param {string} value - The key to translate.
     * @returns {string} The translated string if available, otherwise returns the key itself wrapped in curly braces.
     */
    translate: (value: string): string => getTranslation(locale.translation, value),

    /**
     * Resets the locale state to its initial values.
     */
    resetLocale: (): void => {
      dispatch(RESET())
    },

    /**
     * Sets the language to the specified language code.
     *
     * @param {string} langCode - The language code to change to.
     */
    setLanguage: (langCode: string): void => {
      dispatch(CHANGE_LANGUAGE(langCode))
    },

    /**
     * Sets the language direction (ltr or rtl).
     *
     * @param {"ltr" | "rtl"} direction - The new language direction.
     */
    setLangDirection: (direction: 'ltr' | 'rtl'): void => {
      dispatch(CHANGE_LANG_DIRECTION(direction))
    },
  }
}
