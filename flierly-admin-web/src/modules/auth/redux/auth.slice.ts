import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoadingTypes } from '../constants/loading.enum'
import statePersist from '@/redux/state-persist'

// Initial state
const INITIAL_STATE: AuthState = {
  user: null,
  allowedAccess: [],
  token: '',
  loggedInAt: '',
  tokenExpiresAt: '',
  isLoggedIn: false,
  loading: LoadingTypes.IDLE,
  isExpired: false,
  error: null,
}

// Fetching the persisted state from localStorage if available
const PERSISTING_STATE: AuthState | null = statePersist.get<AuthState>('auth') || null

// Utility for localStorage handling
const saveAuthToLocalStorage = (authState: AuthState) => {
  localStorage.setItem('auth', JSON.stringify(authState))
}

const clearAuthFromLocalStorage = () => {
  localStorage.removeItem('auth')
}

// Create the authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState: PERSISTING_STATE ?? INITIAL_STATE, // Use persisted state or fallback to the initial state
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      Object.assign(state, action.payload)
      saveAuthToLocalStorage(state)
    },
    logout: (state) => {
      Object.assign(state, INITIAL_STATE) // Reset state to initial values
      clearAuthFromLocalStorage()
    },
    setExpiredTrue: (state, action: PayloadAction<ErrorDetails>) => {
      state.isExpired = true
      state.error = action.payload
      state.loading = LoadingTypes.IDLE
      saveAuthToLocalStorage(state)
    },
    setLoading: (state, action: PayloadAction<LoadingTypes>) => {
      state.loading = action.payload
      saveAuthToLocalStorage(state)
    },
  },
})

export const { logout, setAuth, setLoading, setExpiredTrue } = authSlice.actions
export const authReducer = authSlice.reducer
