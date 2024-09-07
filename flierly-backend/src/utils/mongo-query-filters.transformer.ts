/**
 * Transforms a MongoDB query filter object by converting string representations
 * of regular expressions and dates into their respective JavaScript objects,
 * and appropriately handling numbers and other filter operators.
 *
 * @param filter - The MongoDB query filter object to be transformed.
 * @returns A new object with regular expression, date, and number string values transformed
 *          into RegExp, Date, or Number objects as appropriate.
 */
function transformMongoQueryFilter(filter: FilterObject): FilterObject {
    // Regex pattern to identify regex-like strings in the format of '/pattern/flags'
    const regexPattern = /^\/(.*)\/([gimsuy]*)$/;
    // Regex pattern to identify ISO date strings
    const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    // Regex pattern to identify numeric strings
    const numberPattern = /^-?\d+(\.\d+)?$/;

    /**
     * Recursively transforms values within the filter object. Converts regex-like
     * strings to RegExp objects, ISO date strings to Date objects, and numeric strings
     * to Number objects.
     *
     * @param value - The value to be transformed.
     * @returns The transformed value, which could be a RegExp, Date, Number, or the original value.
     */
    const transformValue = (value: FilterValue): any => {
        if (typeof value === 'string') {
            // Check if the value matches the regex pattern format
            const regexMatch = value.match(regexPattern);
            if (regexMatch) {
                // Create a RegExp object from the matched pattern and flags
                return new RegExp(regexMatch[1], regexMatch[2]);
            }

            // Check if the value matches the ISO date string format
            if (datePattern.test(value)) {
                // Convert the ISO date string to a Date object
                return new Date(value);
            }

            // Check if the value matches the numeric string format
            if (numberPattern.test(value)) {
                // Convert numeric strings to Number objects
                return Number(value);
            }
        }

        // If the value is an object, recursively transform each key-value pair
        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                // Transform each element in the array
                return value.map(transformValue);
            } else {
                // Transform each key-value pair in the object
                return Object.fromEntries(
                    Object.entries(value).map(([key, val]) => [key, transformValue(val)])
                );
            }
        }

        // Return the value as-is if no transformation is needed
        return value;
    };

    // Transform the entire filter object
    return Object.fromEntries(
        Object.entries(filter).map(([key, value]) => [key, transformValue(value)])
    );
}

export default transformMongoQueryFilter;