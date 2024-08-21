import { serverConfig } from "@/config/serverConfig";
import errorHandler from "@/handlers/errorHandler";
import successHandler from "@/handlers/successHandler";
import statePersist from "@/redux/statePersist";
import axios from "axios";

const api = axios.create({
  baseURL: serverConfig.BASE_API_URL,
  headers: {
    Authorization: "Bearer " + statePersist.get("auth")?.token,
  },
});

const crudService = {
  page: async ({
    entity = "",
    autopopulate = false,
    pagination = { limit: 10, page: 1 },
  }) => {
    try {
      // Sending POST request to authenticate user
      const response = await api.get(`/${entity}/page`, {
        params: { autopopulate: autopopulate, ...pagination },
      });

      // Destructuring data and status from response
      const { data, status } = response;

      // Handling success response
      successHandler(
        { data, status },
        {
          notifyOnSuccess: false, // Disable success notification
          notifyOnFailed: true, // Enable failure notification
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

export default crudService;
