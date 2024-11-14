import store from "@/redux/store";

/**
 * Listens to authentication state changes and executes the callback.
 * @param {Function} callback - The function to execute on state change.
 * @returns {Function} Unsubscribe function to stop listening to state changes.
 */
export const listenToAuthChanges = (callback) => {
    let currentState = store.getState().auth;

    const handleChange = () => {
        const nextState = store.getState().auth;
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
export const getToken = () => {
    const state = store.getState();
    return state.auth.token;
};

/**
 * Logs out the current user.
 */
export const logout = () => {
    store.dispatch({ type: 'auth/LOGOUT' });
    console.log('Logged out successfully');
};