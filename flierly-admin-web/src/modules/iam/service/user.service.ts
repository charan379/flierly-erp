import { serverConfig } from "@/config/server.config";
import { getToken, listenToAuthChanges } from "@/modules/auth/service/authStateService";
import handleResponse from "@/utils/handlers/apiResponsehandler";
import axios from "axios";

// Create Axios instance with default headers
const api = axios.create({
    baseURL: serverConfig.BASE_API_URL,
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

const userService = {
    /**
     * update-user-password
     */
    updateUserPassword: async<T>({
        userId,
        newPassword,
        signal,
    }: { newPassword: string, signal?: AbortSignal, userId: number }) => {
        const promise = api.post<ApiResponse<T>>(
            `/user/update-password`,
            { userId, password: newPassword },
            { signal }
        );
        return handleResponse<T>({ promise, notifyOnSuccess: true });
    },
};

// Update Authorization header when auth state changes
listenToAuthChanges((newState) => {
    const newToken = `Bearer ${newState?.token}`;
    if (newToken !== api.defaults.headers.Authorization) {
        api.defaults.headers.Authorization = newToken;
    }
});

export default userService;
