import getTranslation from "@/utils/getTranslation";
import { getLangCode, getTranslationObject, listenToLocaleChanges, } from "./localeState";

let currentLangCode = getLangCode();
let currentTranslationObject = getTranslationObject();

const translate = (value) => {
    return getTranslation(currentTranslationObject, value);
};

export default translate;

listenToLocaleChanges((newState) => {
    const oldLangCode = currentLangCode;
    const newLangCode = newState?.langCode;

    if (newLangCode && oldLangCode !== newLangCode) {
        currentLangCode = newLangCode;
        currentTranslationObject = newState?.translation;
    }
})

