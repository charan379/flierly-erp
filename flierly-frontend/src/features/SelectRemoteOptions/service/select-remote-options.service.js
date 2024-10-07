import { serverConfig } from "@/config/serverConfig";
import { getToken, listenToAuthChanges } from "@/modules/auth/utility/authState";
import handleResponse from "@/utils/handlers/handleResponse";
import axios from "axios";

const api = axios.create({
  baseURL: serverConfig.BASE_API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const selectRemoteOptionsService = {
  // Fetch remote options for entities
  entities: async ({ keyword, limit = 50, signal }) => {
    const promise = api.get(`entities`, {
      params: { keyword, limit },
      signal, // Pass the signal to the request
    });
    return handleResponse({ promise });
  },

  // Fetch remote entity rows
  entityRows: async ({ entity, filters, limit = 50, signal }) => {
    const promise = api.post(
      `${entity}/search`,
      { filters, limit },
      { signal } // Pass the signal to the request
    );
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
