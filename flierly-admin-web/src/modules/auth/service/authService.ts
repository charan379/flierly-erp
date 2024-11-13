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
   * @param {LoginCredentials} credentials - User login credentials
   * @returns {Promise<any>} - Response data or error
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<UserAuth>> => {
    try {
      const response: AxiosResponse = await api.post(`/user/authenticate`, credentials);
      const { data, status } = response;
      successHandler({ data, status }, { notifyOnSuccess: false, notifyOnFailed: true });
      return data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  /**
   * Function to handle user refresh token
   * @param {string} currentToken - The current access token
   * @returns {Promise<ApiResponse<UserAuth>>} - Response data with refreshed token and user data
   */
  refreshToken: async ({ currentToken }: { currentToken: string }): Promise<ApiResponse<UserAuth>> => {
    try {
      api.defaults.headers['Authorization'] = `Bearer ${currentToken}`;
      const response: AxiosResponse = await api.get(`/user/refresh-access-token`);
      const { data, status } = response;
      successHandler({ data, status }, { notifyOnSuccess: false, notifyOnFailed: true });
      return data;
    } catch (error) {
      return errorHandler(error);
    }
  },
};

export default authService;
