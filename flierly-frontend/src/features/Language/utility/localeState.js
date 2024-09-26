import store from "@/redux/store";

/**
 * Listens to locale state changes and executes the callback.
 * @param {Function} callback - The function to execute on state change.
 * @returns {Function} Unsubscribe function to stop listening to state changes.
 */
export const listenToLocaleChanges = (callback) => {
    let currentState = store.getState().locale;

    const handleChange = () => {
        const nextState = store.getState().locale;
        if (nextState !== currentState) {
            currentState = nextState;
            callback(currentState);
        }
    };

    const unsubscribe = store.subscribe(handleChange);
    return unsubscribe;
};

/**
 * Retrieves the lang-code from the state.
 * @returns {string} The langCode string.
 */
export const getLangCode = () => {
    const state = store.getState();
    return state.locale.langCode;
};

/**
 * Retrieves the translation from the state.
 * @returns {string} The translation object.
 */
export const getTranslationObject = () => {
    const state = store.getState();
    return state.locale.translation;
};