import { notification } from "antd";
import codeMessage from "./codeMessage";
import { message as antdMessage } from "antd";

/**
 * Handles the success notification.
 *
 * @param {string} notifyType - The type of notification to use ("toast" or "message").
 * @param {string} httpCode - The HTTP status code to display in the notification.
 * @param {string} message - The message to display in the notification.
 */
const handleSuccessNotification = (notifyType, httpCode, message) => {
  switch (notifyType) {
    case "toast":
      notification.config({
        duration: 2, // Duration the notification will be displayed
        maxCount: 3, // Maximum number of notifications displayed at once
      });
      notification.success({
        message: `${httpCode} : Request success`, // Title of the success notification with httpCode
        description: message, // Description of the success notification
      });
      break;
    case "message":
      antdMessage.success(message);
      break;
    default:
      break;
  }
};

/**
 * Handles the error notification.
 *
 * @param {string} notifyType - The type of notification to use ("toast" or "message").
 * @param {string} httpCode - The HTTP status code to display in the notification.
 * @param {string} errorMessage - The error message to display in the notification.
 */
const handleErrorNotification = (notifyType, httpCode, errorMessage) => {
  switch (notifyType) {
    case "toast":
      notification.config({
        duration: 4, // Duration the notification will be displayed
        maxCount: 2, // Maximum number of notifications displayed at once
      });
      notification.error({
        message: `${httpCode} : Request failed`, // Title of the error notification with status code
        description: errorMessage, // Description of the error notification
      });
      break;
    case "message":
      antdMessage.error(errorMessage);
      break;
    default:
      break;
  }
};

/**
 * Handles the success and error notifications based on the server response.
 *
 * @param {Object} [response={ data: any, status: number }] - The response object from the server.
 * @param {any} response.data - The data returned from the server.
 * @param {number} response.status - The HTTP status code of the response.
 * @param {Object} [options={ notifyOnSuccess: false, notifyOnFailed: true, notifyType: "toast" }] - Options for customizing the notification behavior.
 * @param {boolean} options.notifyOnSuccess - Flag to indicate whether to notify on success.
 * @param {boolean} options.notifyOnFailed - Flag to indicate whether to notify on failure.
 * @param {string} options.notifyType - Type of notification to use: "toast" for Ant Design's notification or "message" for message notifications.
 */
const successHandler = (
  response,
  options = {
    notifyOnSuccess: false,
    notifyOnFailed: true,
    notifyType: "toast",
  }
) => {
  // Destructure data and status from response
  const { data, status } = response;

  // Destructure notification options
  const { notifyOnSuccess = false, notifyOnFailed = true, notifyType = "toast" } = options;

  // Extract message and HTTP status code from response data, fallback to default codeMessage if not available
  const message = data?.message || codeMessage[status];
  const httpCode = data?.httpCode || status;

  // Check if the response indicates a successful operation
  if (data?.success) {
    if (notifyOnSuccess) handleSuccessNotification(notifyType, httpCode, message); // Trigger success notification if enabled
  } else {
    if (notifyOnFailed) {
      const errorMessage = data?.error?.message || message; // Use the error message if available, otherwise use the default message
      handleErrorNotification(notifyType, httpCode, errorMessage); // Trigger error notification if enabled
    }
  }
};

export default successHandler;