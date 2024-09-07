import { serverConfig } from "@/config/serverConfig";
import errorHandler from "@/utils/handlers/errorHandler";
import successHandler from "@/utils/handlers/successHandler";
import {
  getToken,
  listenToAuthChanges,
} from "@/modules/auth/utility/authState";
import axios from "axios";

const api = axios.create({
  baseURL: serverConfig.BASE_API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// Function to handle API responses
const handleResponse = async (promise, notifyOnSuccess, notifyOnFailed) => {
  try {
    const { data, status } = await promise;
    successHandler(
      { data, status },
      {
        notifyOnSuccess,
        notifyOnFailed,
        notifyType: "message",
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

const crudService = {
  // Fetch paginated documents
  page: async ({entity, autopopulate = false, pagination = { limit: 10, page: 1 }, filters = {}, sort = {}, }) => {
    const promise = api.post(
      `/${entity}/page`,
      { filters, pagination, sort, autopopulate },
      {}
    );
    return handleResponse(promise, false, true);
  },

  // Soft delete documents
  delete: async ({ entity, docIds = [] }) => {
    const promise = api.delete(`/${entity}/delete`, {
      data: docIds,
    });
    return handleResponse(promise, true, true);
  },

  // Activate or inactivate documents
  activate: async ({ entity, docIds = [], action = "activate" }) => {
    const promise = api.put(`/${entity}/activate`, {
      ids: docIds,
      action,
    });
    return handleResponse(promise, true, true);
  },

  // Restore documents
  restore: async ({ entity, docIds = [] }) => {
    const promise = api.put(`/${entity}/restore`, docIds);
    return handleResponse(promise, true, true);
  },
};

export default crudService;

listenToAuthChanges((newState) => {
  console.log(newState);
  const oldToken = `Bearer ${api.defaults.headers["Authorization"]}`;
  const newToken = `Bearer ${newState?.token}`;
  if (oldToken && newToken && oldToken !== newState)
    api.defaults.headers["Authorization"] = newToken;
});
