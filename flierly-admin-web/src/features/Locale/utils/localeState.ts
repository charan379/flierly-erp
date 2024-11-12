import store from "@/redux/store";
import getTranslation from "./getTranslation";

/**
 * Listens to locale state changes and executes the callback..
 */
export const listenToLocaleChanges = (callback: (locale: LocaleState) => void): () => void => {
    let currentState: LocaleState = store.getState().locale;

    const handleChange = () => {
        const nextState: LocaleState = store.getState().locale;
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
export const getLangCode = (): string => {
    const state = store.getState();
    return state.locale.langCode;
};

/**
 * Retrieves the translation object from the state.
 * @returns {Record<string, string>} The translation object.
 */
export const getTranslationObject = (): Record<string, string> => {
    const state = store.getState();
    return state.locale.translation;
};


let currentLangCode = getLangCode();
let currentTranslationObject = getTranslationObject();

/**
 * Translates a given key using the current translation object.
 * 
 * @param {string} value - The key to translate.
 * @returns {string} The translated string if available, otherwise returns a placeholder.
 */
export const translate = (value: string): string => {
    return getTranslation(currentTranslationObject, value);
};

/**
 * Subscribes to locale changes and updates the current language code and translation object.
 */
listenToLocaleChanges((newState: LocaleState) => {
    const oldLangCode: string = currentLangCode;
    const newLangCode: string = newState.langCode;

    if (newLangCode && oldLangCode !== newLangCode) {
        currentLangCode = newLangCode;
        currentTranslationObject = newState?.translation;
    }

    console.log({ oldLangCode, newLangCode });
});
