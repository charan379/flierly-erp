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

  // Fetch existing data source
  fetchExistingData: async ({
    entity,
    keys = []
  }) => {
    const promise = api.post(
      `/${entity}/search`,
      { filters: { id: { $in: keys } }, limit: keys.length },
      {}
    );
    return handleResponse({ promise });
  },

  // Update Array field
  updateArrayField: async ({ entity, id, fieldPath, newArray }) => {
    const promise = api.patch(
      `${entity}/update-array-field`,
      {
        id,
        propertyName: fieldPath,
        newArray
      },
      {}
    );
    return handleResponse({ promise, notifyOnSuccess: true });
  },
};

export default tableTransferService;

listenToAuthChanges((newState) => {
  const oldToken = `Bearer ${api.defaults.headers["Authorization"]}`;
  const newToken = `Bearer ${newState?.token}`;
  if (oldToken && newToken && oldToken !== newState)
    api.defaults.headers["Authorization"] = newToken;
});
