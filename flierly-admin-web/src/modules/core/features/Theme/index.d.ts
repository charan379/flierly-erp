type ThemePreference = 'light' | 'dark' | 'system' // Theme preference: 'light', 'dark', or 'system'

// Type definitions for the theme state
interface ThemeState {
  mode: 'light' | 'dark' // Theme mode: 'light', 'dark'.
  preference: ThemePreference
  compact: boolean // Indicates if compact mode is enabled
}
