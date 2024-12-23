import { serverConfig } from "@/config/serverConfig";
import { getToken, listenToAuthChanges } from "@/modules/auth/service/authStateService";
import handleResponse from "@/utils/handlers/apiResponsehandler";
import axios from "axios";

// Create Axios instance with default headers
const api = axios.create({
    baseURL: serverConfig.BASE_API_URL,
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

const crudService = {
    /**
     * Fetch paginated data
     */
    page: async<T>({
        entity,
        binMode = false,
        pagination = { limit: 10, page: 1 },
        filters = {},
        sort = {},
        signal,
    }: EntitiesPageRequest) => {
        const promise = api.post<ApiResponse<T>>(
            `/${entity}/page`,
            { filters, pagination, sort, binMode },
            { signal }
        );
        return handleResponse<T>({ promise });
    },

    /**
     * Create a new entity
     */
    create: async <T>({ entity, data, signal }: CreateEntityRequest<T>) => {
        const promise = api.post(`/${entity}/create`, data, { signal });
        return handleResponse<T>({ promise, notifyOnSuccess: true });
    },

    /**
     * Update an existing entity
     */
    update: async <T>({ entity, id, data, signal }: UpdateEntityRequest<T>) => {
        const promise = api.put(`/${entity}/update/${id}`, data, { signal });
        return handleResponse<T>({ promise, notifyOnSuccess: true });
    },

    /**
     * Check if an entity exists
     */
    isExists: async ({ entity, filters = {}, signal }: EntityRecordExistsRequest) => {
        const promise = api.post(
            `/${entity}/is-exists`,
            { filters, withDeleted: true },
            { signal }
        );
        return handleResponse({ promise });
    },

    /**
     * Soft delete entities
     */
    delete: async ({ entity, ids = [], signal }: EntityRecordsDeleteRequest) => {
        const promise = api.delete(`/${entity}/delete`, {
            data: ids,
            signal,
        });
        return handleResponse({ promise, notifyOnSuccess: true });
    },

    /**
     * Activate entities
     */
    activate: async ({ entity, ids = [], signal }: EntityRecordsActivateRequest) => {
        const promise = api.patch(`/${entity}/activate`, ids, { signal });
        return handleResponse({ promise, notifyOnSuccess: true });
    },

    /**
     * Inactivate entities
     */
    inactivate: async ({ entity, ids = [], signal }: EntityRecordsInactivateRequest) => {
        const promise = api.patch(`/${entity}/inactivate`, ids, { signal });
        return handleResponse({ promise, notifyOnSuccess: true });
    },

    /**
     * Restore entities
     */
    restore: async ({ entity, ids = [], signal }: EntityRecordsRestoreRequest) => {
        const promise = api.patch(`/${entity}/restore`, ids, { signal });
        return handleResponse({ promise, notifyOnSuccess: true });
    },
};

// Update Authorization header when auth state changes
listenToAuthChanges((newState) => {
    const newToken = `Bearer ${newState?.token}`;
    if (newToken !== api.defaults.headers.Authorization) {
        api.defaults.headers.Authorization = newToken;
    }
});

export default crudService;
