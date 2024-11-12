// Define the shape of the locale state
type LocaleState = {
    translation: Record<string, string>; // Language translations for the selected language
    langCode: string; // Language code (e.g., "en_us", "te_in")
    langDirection: "ltr" | "rtl"; // Text direction (left-to-right or right-to-left)
}

type Language = {
    name: string;
    country: string;
    code: string;
};