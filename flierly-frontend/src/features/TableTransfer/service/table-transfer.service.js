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

const tableTransferService = {
  // Fetch paginated documents
  entityPage: async ({
    entity,
    pagination = { limit: 10, page: 1 },
    filters = {},
    sort = {},
  }) => {
    const promise = api.post(
      `/${entity}/page`,
      { filters, pagination, sort },
      {}
    );
    return handleResponse({ promise });
  },
};

export default tableTransferService;

listenToAuthChanges((newState) => {
  const oldToken = `Bearer ${api.defaults.headers["Authorization"]}`;
  const newToken = `Bearer ${newState?.token}`;
  if (oldToken && newToken && oldToken !== newState)
    api.defaults.headers["Authorization"] = newToken;
});
