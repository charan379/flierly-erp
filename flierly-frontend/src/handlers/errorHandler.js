import { notification } from 'antd';
import codeMessage from './codeMessage';

/**
 * Handles errors and displays appropriate notifications.
 *
 * @param {Object} error - The error object from the failed request.
 * @returns {Object} - An object representing the error state.
 */
const errorHandler = (error) => {
  // Check if the user is offline
  if (!navigator.onLine) {
    // Configure notification settings for offline error
    notification.config({
      duration: 15,
      maxCount: 1,
    });
    // Show offline error notification
    notification.error({
      message: 'No internet connection',
      description: 'Cannot connect to the Internet. Check your internet network.',
    });
    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server. Check your internet network.',
    };
  }

  const { response } = error;

  // Handle case when there is no response from the server
  if (!response) {
    // Configure notification settings for server connection error
    notification.config({
      duration: 20,
      maxCount: 1,
    });
    // Show server connection error notification
    notification.error({
      message: 'Problem connecting to server',
      description: 'Cannot connect to the server. Try again later.',
    });
    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server. Contact your account administrator.',
    };
  }

  // Handle JWT expiration
  if (response.data?.jwtExpired) {
    const auth = window.localStorage.getItem('auth');
    const isLogout = JSON.parse(window.localStorage.getItem('isLogout')) || false;
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('isLogout');
    if (auth || isLogout) {
      window.location.href = '/logout';
    }
  }

  // Handle response errors with status codes
  if (response.status) {
    const message = response.data?.message || codeMessage[response.status];
    const { status } = response;
    // Configure notification settings for response error
    notification.config({
      duration: 20,
      maxCount: 2,
    });
    // Show response error notification
    notification.error({
      message: `Request error ${status}`,
      description: message,
    });
    return response.data;
  } else {
    // Default error handling
    notification.config({
      duration: 15,
      maxCount: 1,
    });

    if (navigator.onLine) {
      // Show server connection error notification if online
      notification.error({
        message: 'Problem connecting to server',
        description: 'Cannot connect to the server. Try again later.',
      });
      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server. Contact your account administrator.',
      };
    } else {
      // Show offline error notification if offline
      notification.error({
        message: 'No internet connection',
        description: 'Cannot connect to the Internet. Check your internet network.',
      });
      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server. Check your internet network.',
      };
    }
  }
};

export default errorHandler;
