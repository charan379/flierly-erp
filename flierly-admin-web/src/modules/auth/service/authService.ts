import axios, { AxiosInstance } from "axios";
import { serverConfig } from "@/config/serverConfig";
import handleResponse from "@/utils/handlers/apiResponsehandler";

// Create an axios instance with the base URL from server configuration
const api: AxiosInstance = axios.create({
  baseURL: serverConfig.BASE_API_URL,
});

const authService = {
  /**
   * Function to handle user login
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<UserAuth>> => {
    const response: ApiResponse<UserAuth> = await handleResponse({
      promise: api.post<ApiResponse<UserAuth>>(`/user/authenticate`, credentials),
      notifyOnFailed: true,
      notifyOnSuccess: true,
      notifyType: "message"
    });
    return response;
  },

  /**
   * Function to handle user refresh token
   */
  refreshToken: async ({ currentToken }: { currentToken: string }): Promise<ApiResponse<UserAuth>> => {
    api.defaults.headers['Authorization'] = `Bearer ${currentToken}`;
    const response: ApiResponse<UserAuth> = await handleResponse({
      promise: api.get<ApiResponse<UserAuth>>(`/user/refresh-access-token`),
      notifyOnFailed: true,
      notifyOnSuccess: true,
      notifyType: "message"
    });
    return response;
  },
};

export default authService;
