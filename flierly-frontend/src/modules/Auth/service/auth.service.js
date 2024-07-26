import { serverConfig } from "@/config/serverConfig";
import errorHandler from "@/handlers/errorHandler";
import successHandler from "@/handlers/successHandler";
import axios from "axios";

const BASE_API_URL = serverConfig.BASE_API_URL;

export const login = async (credentials) => {
  try {
    const response = await axios.post(
      BASE_API_URL + `user/authenticate`,
      credentials
    );

    const { data, status } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      }
    );

    return data;
  } catch (error) {
    return errorHandler(error);
  }
};
