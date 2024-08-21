import { serverConfig } from "@/config/serverConfig";
import errorHandler from "@/handlers/errorHandler";
import successHandler from "@/handlers/successHandler";
import axios from "axios";

// Create an axios instance with the base URL from server configuration
const api = axios.create({
  baseURL: serverConfig.BASE_API_URL,
});

const authService = {
  /**
   * Function to handle user login
   * @param {Object} credentials - User login credentials
   * @returns {Object} - Response data or error
   */
  login: async (credentials) => {
    try {
      // Sending POST request to authenticate user
      const response = await api.post(`/user/authenticate`, credentials);

      // Destructuring data and status from response
      const { data, status } = response;

      // Handling success response
      successHandler(
        { data, status },
        {
          notifyOnSuccess: false, // Disable success notification
          notifyOnFailed: true,   // Enable failure notification
        }
      );

      // Returning response data
      return data;
    } catch (error) {
      // Handling error response
      return errorHandler(error);
    }
  },
};

export default authService;