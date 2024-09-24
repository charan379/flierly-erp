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

  // Soft delete
  delete: async ({ entity, ids = [] }) => {
    const promise = api.delete(`/${entity}/delete`, {
      data: ids
    });
    return handleResponse({ promise, notifyOnSuccess: true });
  },

  // Activate
  activate: async ({ entity, ids = [] }) => {
    const promise = api.patch(`/${entity}/activate`, ids);
    return handleResponse({ promise, notifyOnSuccess: true });
  },

  // Activate
  deactivate: async ({ entity, ids = [] }) => {
    const promise = api.patch(`/${entity}/deactivate`, ids);
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
