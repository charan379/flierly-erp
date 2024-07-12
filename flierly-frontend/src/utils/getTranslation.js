export default function getTranslation(translation, key) {
    try {
        // 
        if (typeof translation !== "object") {
            throw new Error("Invalid language translation");
        }
        // 
        const lowerCaseKey = key
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '_')
            .replace(/ /g, '_');
        // 
        if (translation.hasOwnProperty(lowerCaseKey))
            return translation[lowerCaseKey];
        else
            throw new Error(`No translation available for ${lowerCaseKey}`);
        // 
    } catch (error) {
        // 
        console.log(error.message);
        // 
        return `{${key}}`
    }
}