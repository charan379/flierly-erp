import { notification, message as antdMessage } from "antd";
import { codeMessage } from "./constants/codeMessage";

// Define the response type
interface ResponseData {
  success?: boolean;
  message?: string;
  error?: {
    message?: string;
  };
  httpCode?: number;
}

interface Response {
  data: ResponseData;
  status: number;
}

// Define the options type
interface NotificationOptions {
  notifyOnSuccess?: boolean;
  notifyOnFailed?: boolean;
  notifyType?: "toast" | "message";
}

/**
 * Handles the success notification.
 *
 * @param notifyType - The type of notification to use ("toast" or "message").
 * @param httpCode - The HTTP status code to display in the notification.
 * @param message - The message to display in the notification.
 */
const handleSuccessNotification = (
  notifyType: "toast" | "message",
  httpCode: number,
  message: string
): void => {
  switch (notifyType) {
    case "toast":
      notification.config({
        duration: 3, // Duration the notification will be displayed
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
 * @param notifyType - The type of notification to use ("toast" or "message").
 * @param httpCode - The HTTP status code to display in the notification.
 * @param errorMessage - The error message to display in the notification.
 */
const handleErrorNotification = (
  notifyType: "toast" | "message",
  httpCode: number,
  errorMessage: string
): void => {
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
 * @param response - The response object from the server.
 * @param options - Options for customizing the notification behavior.
 */
const successHandler = (
  response: Response,
  options: NotificationOptions = {
    notifyOnSuccess: false,
    notifyOnFailed: true,
    notifyType: "toast",
  }
): void => {
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
