import { notification } from 'antd';
import { codeMessage } from './constants/codeMessage';
import { logout } from '@/modules/auth/service/authStateService';
import axios, { AxiosError, AxiosResponse } from 'axios';

/**
 * Displays an error notification with a title, description, duration, and maximum count.
 *
 * @param message - Title of the error notification.
 * @param description - Description of the error notification.
 * @param duration - Duration for which the notification will be displayed (in seconds).
 * @param maxCount - Maximum number of notifications displayed at once.
 */
const showErrorNotification = (
  message: string,
  description: string,
  duration = 5,    // Default duration is 5 seconds
  maxCount = 2     // Default maximum number of notifications displayed at once
): void => {
  notification.config({ duration, maxCount });  // Configure notification settings
  notification.error({ message, description });  // Show the error notification
};

/**
 * Returns a standardized error response object for common errors.
 *
 * @param message - The error message to include in the response.
 * @returns A standardized error object containing success status, result, and message.
 */
const errorResult = (message: string): { success: boolean; result: null; message: string } => ({
  success: false,
  result: null,  // No result data on error
  message,       // The error message
});

/**
 * Handles offline errors (e.g., no internet connection).
 *
 * @returns A standardized error response object.
 */
const handleOfflineError = (): ReturnType<typeof errorResult> => {
  showErrorNotification(
    'No internet connection',  // Error title
    'Cannot connect to the Internet. Check your network.',  // Error description
    10,  // Show the notification for 10 seconds
    1    // Only allow 1 notification at a time
  );
  return errorResult('Cannot connect to the server. Check your internet network.');
};

/**
 * Handles errors when no server response is received.
 *
 * @returns A standardized error response object.
 */
const handleNoResponseError = (): ReturnType<typeof errorResult> => {
  showErrorNotification(
    'Problem connecting to server',  // Error title
    'Cannot connect to the server. Try again later.',  // Error description
    5,  // Show the notification for 5 seconds
    1    // Only allow 1 notification at a time
  );
  return errorResult('Cannot connect to the server. Contact your account administrator.');
};

/**
 * Handles JWT expiration by logging the user out and redirecting to the login page.
 */
const handleJwtExpiration = (): void => {
  logout();  // Log the user out
  const callback = {
    pathname: window.location.pathname,  // Current page path
    search: window.location.search,      // Current query parameters
    url: window.location.href,           // Current full URL
  };
  // Redirect to login page with the current URL as the callback
  window.location.href = `/login?callback=${encodeURIComponent(JSON.stringify(callback))}`;
};

/**
 * Handles server response errors, displaying a notification with the error details.
 *
 * @param response - The response object from the server (AxiosResponse).
 * @returns The response data after handling the error.
 */
const handleResponseError = (response: AxiosResponse): any => {
  // Get the error message, either from the response or a predefined message based on status
  const message = response.data?.message || codeMessage[response.status];
  showErrorNotification(`Request error ${response.status}`, message);  // Show the error notification
  return response.data;  // Return the response data
};

/**
 * Handles aborted requests (e.g., request was manually canceled).
 *
 * @returns A standardized error response object.
 */
const handleAbortError = (): ReturnType<typeof errorResult> => {
  return errorResult('Request was aborted.');  // Return an aborted request error
};

/**
 * Handles errors during API requests.
 *
 * @param error - The error object thrown during the API request (AxiosError).
 * @returns A standardized error response object based on the error type.
 */
const errorHandler = (error: unknown): ReturnType<typeof errorResult> => {
  // Check if the user is offline (no internet connection)
  if (!navigator.onLine) {
    return handleOfflineError();
  }

  // Check if the error is an AxiosError
  if (!axios.isAxiosError(error)) {
    return errorResult('An unexpected error occurred.');  // Return a general error message
  }

  const { response, code } = error as AxiosError<any>;  // Extract response and code from the error

  // Handle aborted requests (e.g., request was canceled)
  if (code === 'ERR_CANCELED') {
    return handleAbortError();
  }

  // If there is no response, handle as a no response error
  if (!response) {
    return handleNoResponseError();
  }

  // If the response contains a specific error indicating JWT expiration, handle it
  if (response.data?.error?.reason === 'Token Expired Re-authenticate') {
    handleResponseError(response);
    handleJwtExpiration();  // Log out and redirect to login
  }

  // Handle server response errors based on status
  return response.status ? handleResponseError(response) : handleNoResponseError();
};

export default errorHandler;  // Export the error handler function for use in other parts of the application
