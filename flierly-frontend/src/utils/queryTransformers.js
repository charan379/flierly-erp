const queryTransformers = {
  /**
   * Transforms a plain text value by trimming whitespace.
   *
   * @param {string} value - The text value to be trimmed.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The trimmed text as an object with the field namePath or null if the input is not provided.
   */
  trimTextValue: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      // Trim the input text and return it as an object
      return { [namePath]: value.trim() };
    } else {
      return null; // Return null if the input is empty or not a string
    }
  },

  /**
   * Transforms a plain text value into a regular expression string for queries.
   *
   * @param {string} value - The text value to be transformed into a regex pattern.
   * @param {string} namePath - The path of the field in the query (not used in this transformer).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {string|null} - The regex pattern string (e.g., '/value/i') or null if the input is not provided.
   */
  textWithRegex: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      // Create a regex pattern string for case-insensitive search
      return { [namePath]: `/${value}/i` };
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
      const startDate = new Date(value);
      startDate.setHours(0, 0, 0, 0); // Start of the day

      // Create a new Date object for the end date and set it to the end of the day
      const endDate = new Date(value);
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

  /**
   * Transforms a value into a greater than or equal to query format.
   *
   * @param {any} value - The value to be used in the `$gte` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$gte` operator or null if the input is not valid.
   */
  greaterThanOrEqual: (value, namePath, allValues) => {
    if (value !== undefined && value !== null) {
      return { [namePath]: { $gte: value } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a less than or equal to query format.
   *
   * @param {any} value - The value to be used in the `$lte` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$lte` operator or null if the input is not valid.
   */
  lessThanOrEqual: (value, namePath, allValues) => {
    if (value !== undefined && value !== null) {
      return { [namePath]: { $lte: value } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a greater than query format.
   *
   * @param {any} value - The value to be used in the `$gt` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$gt` operator or null if the input is not valid.
   */
  greaterThan: (value, namePath, allValues) => {
    if (value !== undefined && value !== null) {
      return { [namePath]: { $gt: value } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a less than query format.
   *
   * @param {any} value - The value to be used in the `$lt` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$lt` operator or null if the input is not valid.
   */
  lessThan: (value, namePath, allValues) => {
    if (value !== undefined && value !== null) {
      return { [namePath]: { $lt: value } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a not equal to query format.
   *
   * @param {any} value - The value to be used in the `$ne` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$ne` operator or null if the input is not valid.
   */
  notEqual: (value, namePath, allValues) => {
    if (value !== undefined && value !== null) {
      return { [namePath]: { $ne: value } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a between query format.
   *
   * @param {Array<any>} value - The array with two values (start and end).
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$between` operator or null if the input is not valid.
   */
  between: (value, namePath, allValues) => {
    if (Array.isArray(value) && value.length === 2) {
      return { [namePath]: { $between: value } };
    } else {
      return null;
    }
  },
  /**
   * Transforms a value into a not between query format.
   *
   * @param {Array<any>} value - The array with two values (start and end).
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$notBetween` operator or null if the input is not valid.
   */
  notBetween: (value, namePath, allValues) => {
    if (Array.isArray(value) && value.length === 2) {
      return { [namePath]: { $notBetween: value } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into an is null query format.
   *
   * @param {boolean} value - The boolean value indicating if the field should be null.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$isNull` operator or null if the input is not valid.
   */
  isNull: (value, namePath, allValues) => {
    if (value === true) {
      return { [namePath]: { $isNull: true } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into an is not null query format.
   *
   * @param {boolean} value - The boolean value indicating if the field should not be null.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$isNotNull` operator or null if the input is not valid.
   */
  isNotNull: (value, namePath, allValues) => {
    if (value === true) {
      return { [namePath]: { $isNotNull: true } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a like query format.
   *
   * @param {string} value - The text value to be used in the `$like` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$like` operator or null if the input is not valid.
   */
  like: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return { [namePath]: { $like: `%${value}%` } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a not like query format.
   *
   * @param {string} value - The text value to be used in the `$notLike` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$notLike` operator or null if the input is not valid.
   */
  notLike: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return { [namePath]: { $notLike: `%${value}%` } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into an ilike (case-insensitive like) query format.
   *
   * @param {string} value - The text value to be used in the `$ilike` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$ilike` operator or null if the input is not valid.
   */
  ilike: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return { [namePath]: { $ilike: `%${value}%` } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a not ilike (case-insensitive not like) query format.
   *
   * @param {string} value - The text value to be used in the `$notIlike` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$notIlike` operator or null if the input is not valid.
   */
  notIlike: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return { [namePath]: { $notIlike: `%${value}%` } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a starts with query format.
   *
   * @param {string} value - The text value to be used in the `$startsWith` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$startsWith` operator or null if the input is not valid.
   */
  startsWith: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return { [namePath]: { $startsWith: `${value}` } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a not starts with query format.
   *
   * @param {string} value - The text value to be used in the `$notStartsWith` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$notStartsWith` operator or null if the input is not valid.
   */
  notStartsWith: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return { [namePath]: { $notStartsWith: `${value}` } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into an ends with query format.
   *
   * @param {string} value - The text value to be used in the `$endsWith` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$endsWith` operator or null if the input is not valid.
   */
  endsWith: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return { [namePath]: { $endsWith: `${value}` } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a not ends with query format.
   *
   * @param {string} value - The text value to be used in the `$notEndsWith` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$notEndsWith` operator or null if the input is not valid.
   */
  notEndsWith: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return { [namePath]: { $notEndsWith: `${value}` } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a regex query format.
   *
   * @param {string} value - The regex pattern to be used in the `$regex` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$regex` operator or null if the input is not valid.
   */
  regex: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return { [namePath]: { $regex: value } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a not regex query format.
   *
   * @param {string} value - The regex pattern to be used in the `$notRegex` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$notRegex` operator or null if the input is not valid.
   */
  notRegex: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return { [namePath]: { $notRegex: value } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a case-insensitive regex query format.
   *
   * @param {string} value - The regex pattern to be used in the `$regexi` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$regexi` operator or null if the input is not valid.
   */
  regexi: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return { [namePath]: { $regexi: value } };
    } else {
      return null;
    }
  },

  /**
   * Transforms a value into a case-insensitive not regex query format.
   *
   * @param {string} value - The regex pattern to be used in the `$notRegexi` query.
   * @param {string} namePath - The path of the field in the query (used as the key in the query object).
   * @param {Object} allValues - The complete set of values (not used in this transformer).
   * @returns {Object|null} - The query object with `$notRegexi` operator or null if the input is not valid.
   */
  notRegexi: (value, namePath, allValues) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return { [namePath]: { $notRegexi: value } };
    } else {
      return null;
    }
  },
};

export default queryTransformers;
