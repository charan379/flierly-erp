import { notification } from 'antd';
import codeMessage from './codeMessage';
import { logout } from '@/modules/auth/utility/authState';

/**
 * Displays an error notification with the specified message and description.
 *
 * @param {string} message - The title of the error notification.
 * @param {string} description - The description of the error notification.
 * @param {number} duration - Duration the notification will be displayed.
 * @param {number} maxCount - Maximum number of notifications displayed at once.
 */
const showErrorNotification = (message, description, duration, maxCount) => {
  notification.config({
    duration,
    maxCount,
  });
  notification.error({
    message,
    description,
  });
};

/**
 * Handles the case when the user is offline.
 *
 * @returns {Object} - An object representing the offline error state.
 */
const handleOfflineError = () => {
  showErrorNotification(
    'No internet connection',
    'Cannot connect to the Internet. Check your internet network.',
    15,
    1
  );
  return {
    success: false,
    result: null,
    message: 'Cannot connect to the server. Check your internet network.',
  };
};

/**
 * Handles the case when there is no response from the server.
 *
 * @returns {Object} - An object representing the server connection error state.
 */
const handleNoResponseError = () => {
  showErrorNotification(
    'Problem connecting to server',
    'Cannot connect to the server. Try again later.',
    20,
    1
  );
  return {
    success: false,
    result: null,
    message: 'Cannot connect to the server. Contact your account administrator.',
  };
};

/**
 * Handles JWT expiration by clearing auth data and redirecting to login.
 */
const handleJwtExpiration = () => {
  logout();
  const callback = {
    pathname: window.location.pathname,
    search: window.location.search,
    url: window.location.href
  };
  window.location.href = `/login?callback=${encodeURIComponent(JSON.stringify(callback))}`;
};

/**
 * Handles response errors based on the status code.
 *
 * @param {Object} response - The response object from the server.
 * @returns {Object} - The response data.
 */
const handleResponseError = (response) => {
  const message = response.data?.message || codeMessage[response.status];
  const { status } = response;
  showErrorNotification(
    `Request error ${status}`,
    message,
    20,
    2
  );
  return response.data;
};

/**
 * Handles errors and displays appropriate notifications.
 *
 * @param {Object} error - The error object from the failed request.
 * @returns {Object} - An object representing the error state.
 */
const errorHandler = (error) => {
  // Check if the user is offline
  if (!navigator.onLine) {
    return handleOfflineError();
  }

  const { response } = error;

  // Handle case when there is no response from the server
  if (!response) {
    return handleNoResponseError();
  }

  // Handle JWT expiration
  if (response.data?.error?.reason === 'Token Expired Re-authenticate') {
    handleResponseError(response);
    handleJwtExpiration();
  }

  // Handle response errors with status codes
  if (response.status) {
    return handleResponseError(response);
  } else {
    // Default error handling based on online/offline status
    if (navigator.onLine) {
      return handleNoResponseError();
    } else {
      return handleOfflineError();
    }
  }
};

export default errorHandler;
