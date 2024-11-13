import { notification } from 'antd';
import { codeMessage } from './constants/codeMessage';
import { logout } from '@/modules/auth/service/authStateService';

interface Response {
  status: number;
  data?: {
    message?: string;
    error?: {
      reason?: string;
    };
  };
}

interface Error {
  response?: Response;
  code?: string;
}

/**
 * Displays an error notification with the specified message and description.
 *
 * @param message - The title of the error notification.
 * @param description - The description of the error notification.
 * @param duration - Duration the notification will be displayed.
 * @param maxCount - Maximum number of notifications displayed at once.
 */
const showErrorNotification = (
  message: string,
  description: string,
  duration: number,
  maxCount: number
): void => {
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
 * @returns An object representing the offline error state.
 */
const handleOfflineError = (): { success: boolean; result: null; message: string } => {
  showErrorNotification(
    'No internet connection',
    'Cannot connect to the Internet. Check your internet network.',
    10,
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
 * @returns An object representing the server connection error state.
 */
const handleNoResponseError = (): { success: boolean; result: null; message: string } => {
  showErrorNotification(
    'Problem connecting to server',
    'Cannot connect to the server. Try again later.',
    5,
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
const handleJwtExpiration = (): void => {
  logout();
  const callback = {
    pathname: window.location.pathname,
    search: window.location.search,
    url: window.location.href,
  };
  window.location.href = `/login?callback=${encodeURIComponent(JSON.stringify(callback))}`;
};

/**
 * Handles response errors based on the status code.
 *
 * @param response - The response object from the server.
 * @returns The response data.
 */
const handleResponseError = (response: Response): any => {
  const message = response.data?.message || codeMessage[response.status];
  const { status } = response;
  showErrorNotification(
    `Request error ${status}`,
    message,
    5,
    2
  );
  return response.data;
};

/**
 * Handles request abortion cases.
 *
 * @returns The abort error state.
 */
const handleAbortError = (): { success: boolean; result: null; message: string } => {
  return {
    success: false,
    result: null,
    message: 'Request was aborted.',
  };
};

/**
 * Handles errors and displays appropriate notifications.
 *
 * @param error - The error object from the failed request.
 * @returns An object representing the error state.
 */
const errorHandler = (error: Error): { success: boolean; result: null; message: string } => {
  // Check if the user is offline
  if (!navigator.onLine) {
    return handleOfflineError();
  }

  const { response, code } = error;

  // Handle request abortion
  if (code === 'ERR_CANCELED') {
    return handleAbortError();
  }

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
