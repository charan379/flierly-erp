import { notification, message as antdMessage } from "antd";
import { codeMessage } from "./constants/codeMessage";
import { AxiosResponse } from "axios";

// Define types for notification options and types
type NotificationType = "toast" | "message";  // Type for the notification style
type NotificationOptions = {
  notifyOnSuccess?: boolean;  // Flag to trigger success notifications
  notifyOnFailed?: boolean;   // Flag to trigger error notifications
  notifyType?: NotificationType;  // Type of notification ("toast" or "message")
}

/**
 * Displays a success notification based on the type of notification requested.
 *
 * @param notifyType - The type of notification to show ("toast" or "message").
 * @param httpCode - The HTTP status code to be displayed in the notification.
 * @param message - The message to be displayed in the notification.
 */
const showSuccessNotification = (
  notifyType: NotificationType,
  httpCode: number,
  message: string
): void => {
  // Display a toast notification if the type is "toast"
  if (notifyType === "toast") {
    notification.success({
      message: `${httpCode} : Request success`,  // Title with HTTP status code
      description: message,  // Message content
      duration: 3,  // Duration for which the toast will be displayed (in seconds)
    });
  } else {
    // Display a message box if the type is "message"
    antdMessage.success(message);
  }
};

/**
 * Displays an error notification based on the type of notification requested.
 *
 * @param notifyType - The type of notification to show ("toast" or "message").
 * @param httpCode - The HTTP status code to be displayed in the notification.
 * @param errorMessage - The error message to be displayed in the notification.
 */
const showErrorNotification = (
  notifyType: NotificationType,
  httpCode: number,
  errorMessage: string
): void => {
  // Display a toast notification if the type is "toast"
  if (notifyType === "toast") {
    notification.error({
      message: `${httpCode} : Request failed`,  // Title with HTTP status code
      description: errorMessage,  // Error message content
      duration: 4,  // Duration for which the toast will be displayed (in seconds)
    });
  } else {
    // Display a message box if the type is "message"
    antdMessage.error(errorMessage);
  }
};

/**
 * Handles success and error notifications based on the server response.
 *
 * @param response - The response object from the server containing status and message data.
 * @param options - Custom options for controlling the notification behavior.
 */
const successHandler = (
  response: AxiosResponse,  // The response object from the server (Axios response)
  options: NotificationOptions  // Options for customizing notification behavior
): void => {
  const { data, status } = response;  // Extract data and status from the response

  // Destructure notification options and provide default values if not provided
  const { 
    notifyOnSuccess = false,  // Default: Don't show success notification
    notifyOnFailed = true,    // Default: Show error notification if failed
    notifyType = "toast"     // Default: Use "toast" notification type
  } = options;

  // Extract the message and HTTP status code from the response data, with a fallback option
  const message = data?.message || codeMessage[status] || "Request completed";  // Message to display
  const httpCode = data?.httpCode || status;  // HTTP status code to display

  // If the response indicates success, and notifyOnSuccess is true, show a success notification
  if (data?.success && notifyOnSuccess) {
    showSuccessNotification(notifyType, httpCode, message);
  } 
  // If the response indicates failure, and notifyOnFailed is true, show an error notification
  else if (!data?.success && notifyOnFailed) {
    const errorMessage = data?.error?.message || message;  // Use error message from data, or fallback to the general message
    showErrorNotification(notifyType, httpCode, errorMessage);
  }
};

export default successHandler;  // Export the successHandler function for use in other parts of the application
