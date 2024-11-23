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
    page: async ({
        entity,
        autopopulateIds = true,
        binMode = false,
        pagination = { limit: 10, page: 1 },
        filters = {},
        sort = {},
        signal,
    }: PageProps) => {
        console.log(filters)
        const promise = api.post<ApiResponse<any>>(
            `/${entity}/page`,
            { filters, pagination, sort, autopopulateIds, binMode },
            { signal }
        );
        return handleResponse({ promise });
    },

    /**
     * Create a new entity
     */
    create: async ({ entity, data, signal }: CreateProps) => {
        const promise = api.post(`/${entity}/create`, data, { signal });
        return handleResponse({ promise, notifyOnSuccess: true });
    },

    /**
     * Update an existing entity
     */
    update: async ({ entity, id, data, signal }: UpdateProps) => {
        const promise = api.put(`/${entity}/update/${id}`, data, { signal });
        return handleResponse({ promise, notifyOnSuccess: true });
    },

    /**
     * Check if an entity exists
     */
    exists: async ({ entity, filters = {}, signal }: ExistsProps) => {
        const promise = api.post(
            `/${entity}/exists`,
            { filters, withDeleted: true },
            { signal }
        );
        return handleResponse({ promise });
    },

    /**
     * Soft delete entities
     */
    delete: async ({ entity, ids = [], signal }: DeleteProps) => {
        const promise = api.delete(`/${entity}/delete`, {
            data: ids,
            signal,
        });
        return handleResponse({ promise, notifyOnSuccess: true });
    },

    /**
     * Activate entities
     */
    activate: async ({ entity, ids = [], signal }: ActivateProps) => {
        const promise = api.patch(`/${entity}/activate`, ids, { signal });
        return handleResponse({ promise, notifyOnSuccess: true });
    },

    /**
     * Inactivate entities
     */
    inactivate: async ({ entity, ids = [], signal }: InactivateProps) => {
        const promise = api.patch(`/${entity}/inactivate`, ids, { signal });
        return handleResponse({ promise, notifyOnSuccess: true });
    },

    /**
     * Restore entities
     */
    restore: async ({ entity, ids = [], signal }: RestoreProps) => {
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
