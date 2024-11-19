import { notification, message as antdMessage } from "antd";
import axios, { AxiosResponse, AxiosError } from "axios";
import handleJwtExpiration from "./handleJwtExpiration";

type NotificationType = "toast" | "message";

type HandleResponse<T> = {
    promise: Promise<AxiosResponse<ApiResponse<T>>>;
    notifyOnSuccess?: boolean;
    notifyOnFailed?: boolean;
    notifyType?: NotificationType;
};

/**
 * Displays a success notification.
 */
const showSuccessNotification = (
    notifyType: NotificationType,
    httpCode: number,
    message: string
): void => {
    if (notifyType === "toast") {
        notification.success({
            message: `${httpCode} : Request successful`,
            description: message,
            duration: 3,
        });
    } else {
        antdMessage.success(message);
    }
};

/**
 * Displays an error notification.
 */
const showErrorNotification = (
    notifyType: NotificationType,
    httpCode: number,
    errorMessage: string
): void => {
    if (notifyType === "toast") {
        notification.error({
            message: `${httpCode} : Request failed`,
            description: errorMessage,
            duration: 4,
        });
    } else {
        antdMessage.error(errorMessage);
    }
};

/**
 * Handle specific errors like offline, no response, JWT expiration, and abort errors.
 */
const handleSpecificErrors = <T>(error: AxiosError<ApiResponse<T>>): ErrorDetails => {
    if (error.message === "Network Error") {
        return {
            name: "NetworkError",
            httpCode: 0,
            reason: "Network Error",
            message: "You are offline. Please check your internet connection.",
        };
    }

    if (error.response === undefined) {
        return {
            name: "NoResponseError",
            httpCode: 0,
            reason: "No Response",
            message: "No response from the server. Please try again later.",
        };
    }

    if (error.code === "ECONNABORTED") {
        return {
            name: "RequestTimeout",
            httpCode: 408,
            reason: "Timeout",
            message: "The request was aborted due to a timeout.",
        };
    }

    if (error.response?.status === 401) {
        const isTokenExpired = error.response.data?.error?.reason === "Token Expired Re-authenticate"; // Custom server-side error flag
        if(isTokenExpired) handleJwtExpiration();
        return {
            name: "UnauthorizedError",
            httpCode: 401,
            reason: isTokenExpired ? "JWT Expired" : "Unauthorized",
            message: isTokenExpired
                ? "Your session has expired. Please log in again."
                : "Unauthorized request.",
        };
    }

    return {
        name: "UnexpectedError",
        httpCode: error.response?.status || 500,
        reason: "Unexpected Error",
        message: "An unexpected error occurred.",
        stack: error.stack,
    };
};

/**
 * Handles API responses with notifications and standardized return values.
 */
const handleResponse = async <T>({
    promise,
    notifyOnSuccess = false,
    notifyOnFailed = true,
    notifyType = "message",
}: HandleResponse<T>): Promise<ApiResponse<T>> => {
    try {
        const response = await promise;
        const { data, status } = response;

        if (notifyOnSuccess && data?.success) {
            showSuccessNotification(notifyType, status, data?.message || "Success");
        }

        return {
            success: true,
            result: data.result || null,
            message: data.message || "Operation successful",
            controller: data.controller, // Fetched from response if available
            requestUrl: data.requestUrl, // Fetched from response if available
            error: null,
            httpCode: status,
        };
    } catch (error) {
        if (!axios.isAxiosError(error)) {
            console.error("Unexpected error:", error);
            return {
                success: false,
                result: null,
                message: "An unexpected error occurred",
                controller: "",
                requestUrl: "",
                error: {
                    name: "UnknownError",
                    httpCode: 500,
                    reason: "Unknown",
                    message: "An unexpected error occurred",
                    stack: (error as Error)?.stack,
                },
                httpCode: 500,
            };
        }

        const axiosError = error as AxiosError<ApiResponse<T>>;
        const errorDetails = axiosError.response?.data?.error ?? handleSpecificErrors<T>(axiosError);
        const httpCode = errorDetails.httpCode;

        if (notifyOnFailed) {
            showErrorNotification(notifyType, httpCode, errorDetails.message);
        }

        return {
            success: false,
            result: null,
            message: errorDetails.message,
            controller: "",
            requestUrl: "",
            error: errorDetails,
            httpCode,
        };
    }
};

export default handleResponse;
