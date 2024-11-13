import errorHandler from "./errorHandler";
import successHandler from "./successHandler";
import { AxiosResponse } from "axios";

type NotificationType = "toast" | "message";

type HandleResponse<T> = {
    promise: Promise<AxiosResponse<T>>;
    notifyOnSuccess?: boolean;
    notifyOnFailed?: boolean;
    notifyType?: NotificationType;
};

/**
 * Handles API responses.
 * 
 * @param promise - A promise that resolves to an Axios response object.
 * @param notifyOnSuccess - Flag to enable success notifications.
 * @param notifyOnFailed - Flag to enable error notifications.
 * @param notifyType - Type of notification ("toast" or "message").
 * @returns The data from the successful response or undefined in case of error.
 */
const handleResponse = async <T>({
    promise,
    notifyOnSuccess = false,
    notifyOnFailed = true,
    notifyType = "message",
}: HandleResponse<T>): Promise<T | undefined> => {
    try {
        const response = await promise;
        successHandler(response, { notifyOnSuccess, notifyOnFailed, notifyType });
        return response.data;
    } catch (error) {
        errorHandler(error);
        return undefined;
    }
};

export default handleResponse;
