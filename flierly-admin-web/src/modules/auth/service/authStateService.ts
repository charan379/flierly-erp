import store, { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";

/**
 * Listens to authentication state changes and executes the callback.
 * @param {Function} callback - The function to execute on state change.
 * @returns {Function} Unsubscribe function to stop listening to state changes.
 */
export const listenToAuthChanges = (callback: (authState: AuthState) => void): () => void => {
    let currentState: AuthState = store.getState().auth;

    const handleChange = () => {
        const nextState: AuthState = store.getState().auth;
        if (nextState !== currentState) {
            currentState = nextState;
            callback(currentState);
        }
    };

    const unsubscribe = store.subscribe(handleChange);
    return unsubscribe;
};

/**
 * Retrieves the authentication token from the state.
 * @returns {string} The authentication token.
 */
export const getToken = (): string => {
    const state: RootState = store.getState();
    return state.auth.token;
};

/**
 * Logs out the current user.
 */
export const logout = (): void => {
    const dispatch: AppDispatch = store.dispatch;
    dispatch({ type: 'auth/logout' }); // Assuming `logout` is the action name in the auth slice
    console.log('Logged out successfully');
};
