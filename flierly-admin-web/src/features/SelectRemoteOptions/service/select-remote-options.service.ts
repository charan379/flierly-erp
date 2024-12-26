import axios, { AxiosInstance } from 'axios'
import { serverConfig } from '@/config/server.config'
import { getToken, listenToAuthChanges } from '@/modules/auth/service/auth-state.service'
import handleApiResponse from '@/utils/handlers/api-response.handler'

// Define types for the service methods
interface EntityRequestParams {
  keyword?: string
  limit?: number
  signal?: AbortSignal
}

interface EntityRowsRequestParams {
  entity: string
  filters: Record<string, any>
  limit?: number
  signal?: AbortSignal
}

// Create an Axios instance
const api: AxiosInstance = axios.create({
  baseURL: serverConfig.BASE_API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})

// Service for handling remote options
const selectRemoteOptionsService = {
  /**
   * Fetch remote options for entities.
   */
  entities: async ({ keyword, limit = 50, signal }: EntityRequestParams): Promise<ApiResponse<any>> => {
    const promise = api.get<ApiResponse<any>>(`entities`, {
      params: { keyword, limit },
      signal, // Pass the signal to the request
    })
    return handleApiResponse({ promise })
  },

  /**
   * Fetch remote entity rows.
   */
  entityRows: async ({ entity, filters, limit = 50, signal }: EntityRowsRequestParams): Promise<ApiResponse<any>> => {
    const promise = api.post<ApiResponse<any>>(
      `${entity}/search`,
      { filters, limit },
      { signal }, // Pass the signal to the request
    )
    return handleApiResponse({ promise })
  },
}

export default selectRemoteOptionsService

// Listen for authentication state changes and update token
listenToAuthChanges((newState) => {
  const newToken = `Bearer ${newState?.token}`
  if (newToken) {
    api.defaults.headers['Authorization'] = newToken
  }
})
