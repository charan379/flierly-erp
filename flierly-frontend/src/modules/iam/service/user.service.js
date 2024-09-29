import { serverConfig } from "@/config/serverConfig";
import {
  getToken,
  listenToAuthChanges,
} from "@/modules/auth/utility/authState";
import axios from "axios";
import handleResponse from "@/utils/handlers/handleResponse";

const api = axios.create({
  baseURL: `${serverConfig.BASE_API_URL}/user`,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const userService = {
  // Update User Password
  updateUserPassword: async ({ userId, password }) => {
    const promise = api.post(`/update-password`, { userId, password });
    return handleResponse({ promise });
  },
};

export default userService;

listenToAuthChanges((newState) => {
  const oldToken = `Bearer ${api.defaults.headers["Authorization"]}`;
  const newToken = `Bearer ${newState?.token}`;
  if (oldToken && newToken && oldToken !== newState)
    api.defaults.headers["Authorization"] = newToken;
});
