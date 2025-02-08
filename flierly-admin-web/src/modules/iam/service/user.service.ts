import { serverConfig } from '@/config/server.config'
import { getToken, listenToAuthChanges } from '@/modules/auth/service/auth-state.service'
import handleApiResponse from '@/modules/core/utils/handlers/api-response.handler'
import axios from 'axios'

// Create Axios instance with default headers
const api = axios.create({
  baseURL: serverConfig.BASE_API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})

const userService = {
  /**
   * update-user-password
   */
  updateUserPassword: async <T>({ userId, username, password, signal }: { userId: number, username: string, password: string; signal?: AbortSignal }) => {
    const promise = api.post<ApiResponse<T>>(`/user/${userId}/update-password`, { username, password }, { signal })
    return handleApiResponse<T>({ promise, notifyOnSuccess: true })
  },
}

// Update Authorization header when auth state changes
listenToAuthChanges((newState) => {
  const newToken = `Bearer ${newState?.token}`
  if (newToken !== api.defaults.headers.Authorization) {
    api.defaults.headers.Authorization = newToken
  }
})

export default userService
