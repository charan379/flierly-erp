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
  // page
  page: async ({
    entity,
    autopopulate = false,
    pagination = { limit: 10, page: 1 },
  }) => {
    try {
      // Sending GET request to fetch documents page
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

  // delete
  delete: async ({ entity, docIds = [] }) => {
    try {
      // Sending DELETE request to soft delete documents
      const response = await api.delete(`/${entity}/delete`, {
        data: [...docIds],
      });

      // Destructuring data and status from response
      const { data, status } = response;

      // Handling success response
      successHandler(
        { data, status },
        {
          notifyOnSuccess: true, // Disable success notification
          notifyOnFailed: true, // Enable failure notification
          notifyType: "message",
        }
      );

      // Returning response data
      return data;
    } catch (error) {
      // Handling error response
      return errorHandler(error);
    }
  },

  // activate
  activate: async ({ entity, docIds = [], action = "activate" }) => {
    try {
      // Sending PUT request to activate / inactivate documents
      const response = await api.put(`/${entity}/activate`, {
        ids: docIds,
        action,
      });

      // Destructuring data and status from response
      const { data, status } = response;

      // Handling success response
      successHandler(
        { data, status },
        {
          notifyOnSuccess: true, // Disable success notification
          notifyOnFailed: true, // Enable failure notification
          notifyType: "message",
        }
      );

      // Returning response data
      return data;
    } catch (error) {
      // Handling error response
      return errorHandler(error);
    }
  },

  // restore
  restore: async ({ entity, docIds = [] }) => {
    try {
      // Sending PUT request to restore documents
      const response = await api.put(`/${entity}/restore`, [...docIds], {});

      // Destructuring data and status from response
      const { data, status } = response;

      // Handling success response
      successHandler(
        { data, status },
        {
          notifyOnSuccess: true, // Disable success notification
          notifyOnFailed: true, // Enable failure notification
          notifyType: "message",
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
