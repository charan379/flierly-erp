const queryTransformers = {
  /**
   * Transforms a plain text value into a regular expression string for queries.
   *
   * @param {string} value - The text value to be transformed into a regex pattern.
   * @param {string} namePath - The path of the field in the query (not used in this transformer).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {string|null} - The regex pattern string (e.g., '/value/i') or null if the input is not provided.
   */
  textWithRegex: (value, namePath, allValues) => {
    if (value) {
      // Create a regex pattern string for case-insensitive search
      return `/${value}/i`;
    } else {
      return null; // Return null if no value is provided
    }
  },

  /**
   * Transforms an array of values into a `$in` query format.
   *
   * @param {Array<any>} value - The array of values to be used in the `$in` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$in` operator or null if the input is not a valid array.
   */
  inArray: (value, namePath, allValues) => {
    if (Array.isArray(value) && value.length > 0) {
      // Create a query object with `$in` operator for matching any of the values in the array
      return { [namePath]: { $in: value } };
    } else {
      return null; // Return null if the input is not a valid array
    }
  },

  /**
   * Transforms an array containing start and end dates into a date range query format.
   *
   * @param {Array<string>} value - The array with two date strings (start and end dates).
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$gte` and `$lte` operators for date range or null if the input is not valid.
   */
  dateRange: (value, namePath, allValues) => {
    if (Array.isArray(value) && value.length === 2) {
      // Create a new Date object for the start date and set it to the beginning of the day
      const startDate = new Date(value[0]);
      startDate.setHours(0, 0, 0, 0); // Start of the day

      // Create a new Date object for the end date and set it to the end of the day
      const endDate = new Date(value[1]);
      endDate.setHours(23, 59, 59, 999); // End of the day

      // Create a query object with `$gte` and `$lte` operators for date range
      return {
        [namePath]: {
          $gte: startDate.toISOString(),
          $lte: endDate.toISOString(),
        },
      };
    } else {
      return null; // Return null if the input is not a valid array with exactly two elements
    }
  },
};

export default queryTransformers;
