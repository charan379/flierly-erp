import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // Adjust paths as necessary
import { login, logout, refresh } from "../redux/authSlice";

export function useAuth() {

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

    const auth = useTypedSelector((state) => state.auth);

    const dispatch = useDispatch<AppDispatch>();

    /**
     * Check if a user has a specific permission based on regex.
     * @param requiredPermissionRegex - A regular expression to match permissions.
     * @returns {boolean} - Whether the user has the required permission.
     */
    const hasPermission = (requiredPermissionRegex: RegExp): boolean => {
        return auth.allowedAccess.some((access) => requiredPermissionRegex.test(access));
    };

    return {
        user: auth.user,
        token: auth.token,
        loggedInAt: auth.loggedInAt,
        tokenExpiresAt: auth.tokenExpiresAt,
        isLoggedIn: auth.isLoggedIn,
        loading: auth.loading,
        error: auth.error,
        allowedAccess: auth.allowedAccess,
        hasPermission,
        /**
         * Dispatch login action with credentials.
         * @param credentials - User credentials.
         */
        login: (credentials: LoginCredentials) =>
            dispatch(login(credentials)),
        /**
         * Dispatch logout action.
         */
        logout: () => dispatch(logout()),
        /**
         * Dispatch refresh action.
         * @param currentToken - Optional current token to refresh.
         */
        refresh: (currentToken?: string) => dispatch(refresh(currentToken)),
    };
}
