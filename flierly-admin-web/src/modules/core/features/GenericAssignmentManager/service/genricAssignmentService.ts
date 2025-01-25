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

const genricAssignmentService = {
  /**
   * Fetch paginated data
   */
  entityPage: async <T>({
    entity,
    loadRelations = [],
    binMode = false,
    limit,
    page,
    filters = {},
    sort = {},
    signal,
  }: EntityRecordsPageRequest<T>) => {
    const promise = api.post<ApiResponse<PageData<T>>>(`/${entity}/page`, { filters, page, limit, sort, loadRelations, binMode }, { signal })
    return handleApiResponse<PageData<T>>({ promise })
  },

  /**
   * Fetch related entity paginated data
   */
  associatedEntityPage: async <E, AE>({
    associatedEntity,
    associatedSideField,
    entity,
    entityRecordId,
    entitySideField,
    limit,
    page,
    filters = {},
    sort = {},
    type,
    signal,
  }: AssociatedEntityRecordsPageRequest<E, AE>) => {
    const promise = api.post<ApiResponse<PageData<AE>>>(
      `/${associatedEntity}/associated-entity-records-page`,
      { entity, entityRecordId, associatedSideField, entitySideField, filters, page, limit, sort, type },
      { signal },
    )
    return handleApiResponse<PageData<AE>>({ promise })
  },

  /**
   * updated update-associated-records
   */
  updateAssociatedRecords: async <T>({
    entity,
    entityRecordId,
    entitySideField,
    newArray,
    addOne,
    removeOne,
    addMultiple,
    removeMultiple,
    signal,
  }: UpdateAssociatedEntityRecordsRequest<T>) => {
    const promise = api.patch<ApiResponse<T>>(
      `/${entity}/update-associated-records`,
      { entityRecordId, newArray, entitySideField, addOne, addMultiple, removeOne, removeMultiple },
      { signal },
    )
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

export default genricAssignmentService
