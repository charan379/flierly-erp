import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust paths as necessary
import { logout, setAuth, setLoading, setExpiredTrue } from "../redux/authSlice";
import authService from "../service/authService";
import { LoadingTypes } from "../@types/loading";

export function useAuth() {
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const auth = useTypedSelector((state) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const controller = new AbortController();

    /**
     * Check if a user has a specific permission based on regex.
     * @param requiredPermissionRegex - A regular expression to match permissions.
     * @returns {boolean} - Whether the user has the required permission.
     */
    const hasPermission = (requiredPermissionRegex: RegExp): boolean => {
        return auth.allowedAccess.some((access) => requiredPermissionRegex.test(access));
    };

    // Convert token expiration date to Date object
    const tokenExpiresAtDateTime = new Date(auth.tokenExpiresAt);
    const currentDateTime = new Date();

    // Check if the token expiration date is in the past
    const isTokenExpiryDatePast = tokenExpiresAtDateTime < currentDateTime;

    return {
        user: auth.user,
        token: auth.token,
        loggedInAt: auth.loggedInAt,
        tokenExpiresAt: auth.tokenExpiresAt,
        isLoggedIn: auth.isLoggedIn,
        loading: auth.loading,
        error: auth.error,
        allowedAccess: auth.allowedAccess,
        isExpired: auth.isExpired,
        isTokenExpiryDatePast,
        hasPermission,
        /**
         * Dispatch login action with credentials.
         * @param credentials - User credentials.
         */
        login: async (credentials: LoginCredentials) => {
            dispatch(setLoading(LoadingTypes.PENDING));
            const response = await authService.login(credentials, controller.signal);
            if (response.success && response?.result) {
                const authState: AuthState = {
                    user: response.result.user,
                    allowedAccess: response.result.allowedAccess,
                    error: null,
                    isLoggedIn: true,
                    loggedInAt: response.result.loggedInAt,
                    token: response.result.token,
                    tokenExpiresAt: response.result.tokenExpiresAt,
                    loading: LoadingTypes.IDLE,
                    isExpired: false,
                };
                dispatch(setAuth(authState));
            }
            dispatch(setLoading(LoadingTypes.SUCCEEDED));
        },
        /**
         * Dispatch logout action.
         */
        logout: () => dispatch(logout()),
        /**
         * Dispatch expired true
         */
        setExpiredTrue: (error: ErrorDetails) => dispatch(setExpiredTrue(error)),
        /**
         * Dispatch refresh action.
         */
        refresh: async () => {
            dispatch(setLoading(LoadingTypes.REFRESHING));
            const response = await authService.refreshToken(auth.token);
            if (response.success && response?.result) {
                const authState: AuthState = {
                    user: response.result.user,
                    allowedAccess: response.result.allowedAccess,
                    error: null,
                    isLoggedIn: true,
                    loggedInAt: response.result.loggedInAt,
                    token: response.result.token,
                    tokenExpiresAt: response.result.tokenExpiresAt,
                    loading: LoadingTypes.IDLE,
                    isExpired: false,
                };
                dispatch(setAuth(authState));
            }
            dispatch(setLoading(LoadingTypes.SUCCEEDED));
        },
    };
}
