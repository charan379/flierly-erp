import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { useEffect, useState, useCallback } from 'react'
import { CHANGE_THEME_MODE, CHANGE_THEME_PREFERENCE, TOGGLE_THEME_COMPACTIBILITY } from '../redux/themeSlice'
import throttle from '@/utils/throttle'
import darkTheme from '../config/dark'
import lightTheme from '../config/light'
import { RootState } from '@/redux/store' // Adjust based on your project structure

// Custom hook to access the typed Redux state
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

function useTheme() {
  // Combined selector to get theme-related state from the Redux store
  const { preference, mode: theme, compact } = useTypedSelector((state) => state.theme)

  const dispatch = useDispatch()

  // Function to get system preference for dark mode
  const getSysPreference = (): boolean => window.matchMedia('(prefers-color-scheme: dark)').matches

  // State to track if the system prefers dark mode
  const [isDarkSystem, setIsDarkSystem] = useState<boolean>(getSysPreference)

  // Memoize the function to change CSS root variables based on theme
  const changeCssRootVariables = useCallback((theme: 'dark' | 'light') => {
    if (!['dark', 'light'].includes(theme)) return

    const cssRoot = document.querySelector(':root') as HTMLElement | null
    if (!cssRoot) return

    // Define CSS variables for light and dark themes
    const variables = theme === 'dark' ? darkTheme : lightTheme

    // Update the CSS variables in the root element
    Object.entries(variables).forEach(([key, value]) => {
      cssRoot.style.setProperty(key, value)
    })
  }, [])

  // Initialize theme based on user preference or system preference
  const initTheme = useCallback(() => {
    if (preference === 'system') {
      dispatch(CHANGE_THEME_MODE(isDarkSystem ? 'dark' : 'light'))
    } else if (['dark', 'light'].includes(preference)) {
      dispatch(CHANGE_THEME_MODE(preference))
    }
  }, [preference, isDarkSystem, dispatch])

  // Event listener for system preference changes, throttled to limit frequency
  const sysPreferenceListener = useCallback(
    throttle((event: MediaQueryListEvent) => {
      setIsDarkSystem(event.matches)
      if (preference === 'system') {
        dispatch(CHANGE_THEME_MODE(event.matches ? 'dark' : 'light'))
      }
    }, 200),
    [preference, dispatch],
  )

  useEffect(() => {
    initTheme() // Initialize theme on component mount

    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
    darkThemeMq.addEventListener('change', sysPreferenceListener) // Add event listener for system preference changes

    return () => {
      darkThemeMq.removeEventListener('change', sysPreferenceListener) // Clean up event listener on component unmount
    }
  }, [initTheme, sysPreferenceListener])

  useEffect(() => {
    changeCssRootVariables(theme) // Apply CSS root variables based on theme
    document.body.setAttribute('data-theme', theme) // Set data-theme attribute on body element
  }, [theme, changeCssRootVariables])

  return {
    theme,
    themePreference: preference,
    isCompactTheme: compact,
    toggleCompactTheme: () => dispatch(TOGGLE_THEME_COMPACTIBILITY()),
    setThemePreference: (newPreference: ThemePreference) => dispatch(CHANGE_THEME_PREFERENCE(newPreference)), // Function to change theme preference
  }
}

export default useTheme
