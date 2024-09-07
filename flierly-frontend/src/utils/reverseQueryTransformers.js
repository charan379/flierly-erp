const reverseQueryTransformers = {
  /**
   * Converts a regex string back to its original value.
   *
   * @param {string} value - The regex string to be converted.
   * @returns {string|null} - The original value extracted from the regex or null if not a valid regex.
   */
  textWithRegex: (value) => {
    if (value) {
      // Match the regex pattern to extract the original value
      const regexMatch = value.match(/^\/(.*)\/([gimsuy]*)$/);
      if (regexMatch) {
        return regexMatch[1]; // Extract and return the original value
      }
    }
    return null; // Return null if the input is not a valid regex string
  },

  /**
   * Reverse transformer for extracting an array from a `$in` query.
   *
   * @param {Object} value - The query object containing `$in` array.
   * @returns {Array<any>|null} - The array of values or null if `$in` is not present or is not an array.
   */
  inArray: (value) => {
    if (value && Array.isArray(value.$in)) {
      return value.$in; // Return the array of values
    }
    return null; // Return null if the value is not valid and `$in` is not an array .
  },

  /**
   * Reverse transformer for extracting a date range from a query.
   *
   * @param {Object} value - The query object containing `$gte` and `$lte`.
   * @returns {Array<string>|null} - An array with two date strings in 'YYYY-MM-DD' format or null if format is not matched.
   */
  dateRange: (value) => {
    if (
      value &&
      Object.prototype.hasOwnProperty.call(value, "$gte") &&
      Object.prototype.hasOwnProperty.call(value, "$lte")
    ) {
      return [
        new Date(value.$gte).toISOString().split("T")[0], // Convert `$gte` to Date
        new Date(value.$lte).toISOString().split("T")[0], // Convert `$lte` to Date
      ];
    }
    return null; // Return null if the query does not contain `$gte` and `$lte` properties
  },
};

export default reverseQueryTransformers;
