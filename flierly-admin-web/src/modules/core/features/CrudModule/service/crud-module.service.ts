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

const crudService = {
  /**
   * Fetch paginated entity records
   */
  page: async <E>({ entity, binMode = false, limit, page, loadRelations, filters = {}, sort = {}, signal }: EntityRecordsPageRequest<E>) => {
    const promise = api.post<ApiResponse<PageData<E>>>(`/${entity}/page`, { filters, limit, page, loadRelations, sort, withDeleted: binMode }, { signal })
    return handleApiResponse<PageData<E>>({ promise })
  },

  /**
   * Create a new entity record
   */
  create: async <E>({ entity, data, signal }: CreateEntityRecordRequest<E>) => {
    const promise = api.post(`/${entity}/create`, data, { signal })
    return handleApiResponse<E>({ promise, notifyOnSuccess: true })
  },

  /**
   * Update an existing entity record
   */
  update: async <E>({ entity, id, data, signal }: UpdateEntityRecordRequest<E>) => {
    const promise = api.put(`/${entity}/update/${id}`, data, { signal })
    return handleApiResponse<E>({ promise, notifyOnSuccess: true })
  },

  /**
   * Check if an entity record exists
   */
  isExists: async <T>({ entity, filters = {}, signal }: EntityRecordExistsRequest<T>) => {
    const promise = api.post(`/${entity}/is-exists`, { filters, withDeleted: true }, { signal })
    return handleApiResponse({ promise })
  },

  /**
   * Soft delete entity records
   */
  delete: async ({ entity, ids = [], signal }: EntityRecordsDeleteRequest) => {
    const promise = api.delete(`/${entity}/delete`, {
      data: ids,
      signal,
    })
    return handleApiResponse({ promise, notifyOnSuccess: true })
  },

  /**
   * Activate entity records
   */
  activate: async ({ entity, ids = [], signal }: EntityRecordsActivateRequest) => {
    const promise = api.patch(`/${entity}/activate`, ids, { signal })
    return handleApiResponse({ promise, notifyOnSuccess: true })
  },

  /**
   * Inactivate entity records
   */
  inactivate: async ({ entity, ids = [], signal }: EntityRecordsInactivateRequest) => {
    const promise = api.patch(`/${entity}/inactivate`, ids, { signal })
    return handleApiResponse({ promise, notifyOnSuccess: true })
  },

  /**
   * Restore entity records
   */
  restore: async ({ entity, ids = [], signal }: EntityRecordsRestoreRequest) => {
    const promise = api.patch(`/${entity}/restore`, ids, { signal })
    return handleApiResponse({ promise, notifyOnSuccess: true })
  },
}

// Update Authorization header when auth state changes
listenToAuthChanges((newState) => {
  const newToken = `Bearer ${newState?.token}`
  if (newToken !== api.defaults.headers.Authorization) {
    api.defaults.headers.Authorization = newToken
  }
})

export default crudService
