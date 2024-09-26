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
  }) => {
    const promise = api.post(
      `/${entity}/page`,
      { filters, pagination, sort, autopopulateIds, binMode },
      {}
    );
    return handleResponse({ promise });
  },
  // Create a new entity row
  create: async ({ entity, data }) => {
    const promise = api.post(`/${entity}/create`, { ...data }, {});
    return handleResponse({ promise, notifyOnSuccess: true });
  },
  // Fetch exists status
  exists: async ({ entity, filters = {} }) => {
    const promise = api.post(
      `/${entity}/exists`,
      { filters, withDeleted: false },
      {}
    );
    return handleResponse({ promise });
  },

  // Soft delete
  delete: async ({ entity, ids = [] }) => {
    const promise = api.delete(`/${entity}/delete`, {
      data: ids,
    });
    return handleResponse({ promise, notifyOnSuccess: true });
  },

  // Activate
  activate: async ({ entity, ids = [] }) => {
    const promise = api.patch(`/${entity}/activate`, ids);
    return handleResponse({ promise, notifyOnSuccess: true });
  },

  // Activate
  inactivate: async ({ entity, ids = [] }) => {
    const promise = api.patch(`/${entity}/inactivate`, ids);
    return handleResponse({ promise, notifyOnSuccess: true });
  },

  // Restore
  restore: async ({ entity, ids = [] }) => {
    const promise = api.patch(`/${entity}/restore`, ids);
    return handleResponse({ promise, notifyOnSuccess: true });
  },
};

export default crudService;

listenToAuthChanges((newState) => {
  const oldToken = `Bearer ${api.defaults.headers["Authorization"]}`;
  const newToken = `Bearer ${newState?.token}`;
  if (oldToken && newToken && oldToken !== newState)
    api.defaults.headers["Authorization"] = newToken;
});
