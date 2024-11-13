import axios, { AxiosResponse, AxiosInstance } from "axios";
import { serverConfig } from "@/config/serverConfig";
import errorHandler from "@/utils/handlers/errorHandler";
import successHandler from "@/utils/handlers/successHandler";

// Create an axios instance with the base URL from server configuration
const api: AxiosInstance = axios.create({
  baseURL: serverConfig.BASE_API_URL,
});

const authService = {
  /**
   * Function to handle user login
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<UserAuth> | undefined> => {
    try {
      const response: AxiosResponse = await api.post(`/user/authenticate`, credentials);
      successHandler(response, { notifyOnSuccess: false, notifyOnFailed: true });
      return response.data;;
    } catch (error) {
      errorHandler(error);
    }
  },

  /**
   * Function to handle user refresh token
   */
  refreshToken: async ({ currentToken }: { currentToken: string }): Promise<ApiResponse<UserAuth> | undefined> => {
    try {
      api.defaults.headers['Authorization'] = `Bearer ${currentToken}`;
      const response: AxiosResponse = await api.get(`/user/refresh-access-token`);
      successHandler(response, { notifyOnSuccess: false, notifyOnFailed: true });
      return response.data;
    } catch (error) {
      errorHandler(error);
    }
  },
};

export default authService;
