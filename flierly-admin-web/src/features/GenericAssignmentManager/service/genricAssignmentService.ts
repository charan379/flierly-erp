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

const genricAssignmentService = {
    /**
     * Fetch paginated data
     */
    page: async<T>({
        entity,
        loadRelations = [],
        binMode = false,
        pagination = { limit: 10, page: 1 },
        filters = {},
        sort = {},
        signal,
    }: EntitiesPageRequest) => {
        const promise = api.post<ApiResponse<T>>(
            `/${entity}/page`,
            { filters, pagination, sort, loadRelations, binMode },
            { signal }
        );
        return handleResponse<T>({ promise });
    },

    /**
     * Fetch related entity paginated data
     */
    relatedEntitiespage: async<T>({
        owningEntity,
        inverseEntity,
        owningEntityId,
        inverseSideField,
        owningSideField,
        pagination = { limit: 10, page: 1 },
        filters = {},
        sort = {},
        type,
        signal,
    }: RelatedEntitiesPageRequest) => {

        const promise = api.post<ApiResponse<T>>(
            `/${inverseEntity}/associated-entity-records-page`,
            { owningEntity, owningEntityId, inverseSideField, owningSideField, filters, pagination, sort, type },
            { signal }
        );
        return handleResponse<T>({ promise });
    },

    /**
     * updated update-associated-records
     */
    udateAssociatedRecords: async<T>({
        owningEntity,
        owningEntityId,
        inverseField,
        newArray,
        addOne,
        removeOne,
        addMultiple,
        removeMultiple,
        signal,
    }: UpdateAssociatedEntityRecordsRequest) => {
        const promise = api.patch<ApiResponse<T>>(
            `/${owningEntity}/update-associated-records`,
            { owningEntityId, newArray, inverseField, addOne, addMultiple, removeOne, removeMultiple },
            { signal }
        );
        return handleResponse<T>({ promise, notifyOnSuccess: true });
    },
};

// Update Authorization header when auth state changes
listenToAuthChanges((newState) => {
    const newToken = `Bearer ${newState?.token}`;
    if (newToken !== api.defaults.headers.Authorization) {
        api.defaults.headers.Authorization = newToken;
    }
});

export default genricAssignmentService;
