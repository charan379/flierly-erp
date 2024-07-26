import { notification } from "antd";
import codeMessage from "./codeMessage";

/**
 * Handles the success and error notifications based on the response.
 *
 * @param {Object} [response={ data: any, status: number }] - The response object from the server.
 * @param {any} response.data
 * @param {number} response.status
 * @param {Object} [options={ notifyOnSuccess: false, notifyOnFailed: true }] - Notification options.
 * @param {boolean} options.notifyOnSuccess - Flag to notify on success.
 * @param {boolean} options.notifyOnFailed - Flag to notify on failure.
 */
const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
  const { data, status } = response; // Destructure data and status from response
  const { notifyOnSuccess, notifyOnFailed } = options; // Destructure notification options

  // Extract message and httpCode from response data
  const message = data?.message || codeMessage[status];
  const httpCode = data?.httpCode || status;

  // Check if the response indicates a successful operation
  if (data?.success) {
    if (notifyOnSuccess) {
      // If notifications on success are enabled
      notification.config({
        duration: 2, // Duration the notification will be displayed
        maxCount: 3, // Maximum number of notifications displayed at once
      });
      notification.success({
        message: `${httpCode} : Request success`, // Title of the success notification with httpCode
        description: message, // Description of the success notification
      });
    }
  } else {
    // If the response indicates a failed operation and notifications on failure are enabled
    if (notifyOnFailed) {
      // Use the error message if available, otherwise use the default code message
      const errorMessage = data?.error?.message || message;

      notification.config({
        duration: 4, // Duration the notification will be displayed
        maxCount: 2, // Maximum number of notifications displayed at once
      });
      notification.error({
        message: `${httpCode} : Request failed`, // Title of the error notification with status code
        description: errorMessage, // Description of the error notification
      });
    }
  }
};

export default successHandler;
