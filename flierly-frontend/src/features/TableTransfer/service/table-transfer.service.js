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

const tableTransferService = {};

export default tableTransferService;

listenToAuthChanges((newState) => {
  const oldToken = `Bearer ${api.defaults.headers["Authorization"]}`;
  const newToken = `Bearer ${newState?.token}`;
  if (oldToken && newToken && oldToken !== newState)
    api.defaults.headers["Authorization"] = newToken;
});
