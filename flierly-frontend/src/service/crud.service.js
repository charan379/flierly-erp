import { serverConfig } from "@/config/serverConfig";
import {
  getToken,
  listenToAuthChanges,
} from "@/modules/auth/utility/authState";
import axios from "axios";
import handleResponse from "@/utils/handlers/handleResponse";

const api = axios.create({
  baseURL: serverConfig.BASE_API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const crudService = {
  // Fetch paginated
  page: async ({
    entity,
    autopopulateIds = true,
    binMode = false,
    pagination = { limit: 10, page: 1 },
    filters = {},
    sort = {},
    signal, // Accept AbortSignal
  }) => {
    const promise = api.post(
      `/${entity}/page`,
      { filters, pagination, sort, autopopulateIds, binMode },
      { signal } // Pass the signal to the request
    );
    return handleResponse({ promise });
  },
  // Create a new entity row
  create: async ({ entity, data, signal }) => {
    const promise = api.post(`/${entity}/create`, { ...data }, { signal }); // Pass the signal
    return handleResponse({ promise, notifyOnSuccess: true });
  },
  // Update a new entity row
  update: async ({ entity, id, data, signal }) => {
    const promise = api.put(`/${entity}/update/${id}`, { ...data }, { signal }); // Pass the signal
    return handleResponse({ promise, notifyOnSuccess: true });
  },
  // Fetch exists status
  exists: async ({ entity, filters = {}, signal }) => {
    const promise = api.post(
      `/${entity}/exists`,
      { filters, withDeleted: true },
      { signal } // Pass the signal
    );
    return handleResponse({ promise });
  },
  // Soft delete
  delete: async ({ entity, ids = [], signal }) => {
    const promise = api.delete(`/${entity}/delete`, {
      data: ids,
      signal, // Pass the signal
    });
    return handleResponse({ promise, notifyOnSuccess: true });
  },
  // Activate
  activate: async ({ entity, ids = [], signal }) => {
    const promise = api.patch(`/${entity}/activate`, ids, { signal }); // Pass the signal
    return handleResponse({ promise, notifyOnSuccess: true });
  },
  // Inactivate
  inactivate: async ({ entity, ids = [], signal }) => {
    const promise = api.patch(`/${entity}/inactivate`, ids, { signal }); // Pass the signal
    return handleResponse({ promise, notifyOnSuccess: true });
  },
  // Restore
  restore: async ({ entity, ids = [], signal }) => {
    const promise = api.patch(`/${entity}/restore`, ids, { signal }); // Pass the signal
    return handleResponse({ promise, notifyOnSuccess: true });
  },
};

export default crudService;

listenToAuthChanges((newState) => {
  const oldToken = `Bearer ${api.defaults.headers["Authorization"]}`;
  const newToken = `Bearer ${newState?.token}`;
  if (oldToken && newToken && oldToken !== newState) {
    api.defaults.headers["Authorization"] = newToken;
  }
});
