type AuthState = {
  user: User | null
  allowedAccess: string[]
  token: string
  loggedInAt: string
  tokenExpiresAt: string
  isLoggedIn: boolean
  loading: string // 'IDLE' | 'PENDING' | 'SUCCEEDED' | 'FAILED'
  isExpired?: boolean
  error: ErrorDetails | null
}

type UserAuth = {
  user: User
  allowedAccess: string[]
  token: string
  loggedInAt: string
  tokenExpiresAt: string
}

type LoginCredentials = {
  username: string
  password: string
}
