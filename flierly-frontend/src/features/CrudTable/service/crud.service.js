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
  // Fetch paginated documents
  page: async ({
    entity,
    autopopulate = false,
    pagination = { limit: 10, page: 1 },
    filters = {},
    sort = {},
  }) => {
    const promise = api.post(
      `/${entity}/page`,
      { filters, pagination, sort, autopopulate },
      {}
    );
    return handleResponse({ promise });
  },

  // Soft delete documents
  delete: async ({ entity, docIds = [] }) => {
    const promise = api.delete(`/${entity}/delete`, {
      data: docIds,
    });
    return handleResponse({ promise, notifyOnSuccess: true });
  },

  // Activate or inactivate documents
  activate: async ({ entity, docIds = [], action = "activate" }) => {
    const promise = api.put(`/${entity}/activate`, {
      ids: docIds,
      action,
    });
    return handleResponse({ promise, notifyOnSuccess: true });
  },

  // Restore documents
  restore: async ({ entity, docIds = [] }) => {
    const promise = api.put(`/${entity}/restore`, docIds);
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
