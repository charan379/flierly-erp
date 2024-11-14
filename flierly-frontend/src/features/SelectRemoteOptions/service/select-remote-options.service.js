import { serverConfig } from "@/config/serverConfig";
import {
  getToken,
  listenToAuthChanges,
} from "@/modules/auth/utility/authState";
import handleResponse from "@/utils/handlers/handleResponse";
import axios from "axios";

const api = axios.create({
  baseURL: serverConfig.BASE_API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const selectRemoteOptionsService = {
  // Fetch remote options for model
  models: async ({ keyword, limit = 50 }) => {
    const promise = api.get(`models`, { params: { keyword, limit } });
    return handleResponse({ promise });
  },
  // Fetch remote entities
  entities: async ({ entity, keyword, queryField, limit = 50 }) => {
    // query
    const sort = `${queryField}.asc`;
    const fields = [];
    const queries = [];

    // assign query fields
    fields.push(queryField);
    queries.push(keyword);

    const promise = api.get(`${entity}/search`, {
      params: {
        fields: fields.join(","),
        queries: queries.join(","),
        sort,
        limit,
      },
    });

    return handleResponse({ promise });
  },
};

export default selectRemoteOptionsService;

listenToAuthChanges((newState) => {
  const oldToken = `Bearer ${api.defaults.headers["Authorization"]}`;
  const newToken = `Bearer ${newState?.token}`;
  if (oldToken && newToken && oldToken !== newState)
    api.defaults.headers["Authorization"] = newToken;
});
