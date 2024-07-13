/**
 * Retrieves the translation for a given key from a translation object.
 *
 * @param {Object} translation - The translation object containing key-value pairs of translations.
 * @param {string} key - The key for which translation is needed.
 * @returns {string} The translated string if found, or a placeholder string if not found.
 */
export default function getTranslation(translation, key) {
  try {
    // Check if the translation parameter is an object
    if (typeof translation !== "object") {
      throw new Error("Invalid language translation");
    }

    // Convert the key to lowercase and replace non-alphanumeric characters with underscores
    const lowerCaseKey = key
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "_")
      .replace(/ /g, "_");

    // Check if the key exists in the translation object and return the corresponding value
    if (translation.hasOwnProperty(lowerCaseKey)) {
      return translation[lowerCaseKey];
    } else {
      throw new Error(`No translation available for ${lowerCaseKey}`);
    }
  } catch (error) {
    // Log the error message
    console.log(error.message);

    // Return the key wrapped in curly braces as a fallback
    return `{${key}}`;
  }
}
