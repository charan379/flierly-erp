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
        return regexMatch; // Extract and return the original value
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
    return null; // Return null if the value is not valid and `$in` is not an array.
  },

  /**
   * Reverse transformer for extracting a date range from a query.
   *
   * @param {Object} value - The query object containing `$gte` and `$lte`.
   * @returns {Array<string>|null} - An array with two date strings in 'YYYY-MM-DD' format or null if format is not matched.
   */
  dateRange: (value) => {
    if (value && value.$gte && value.$lte) {
      return [
        new Date(value.$gte).toISOString().split("T"), // Convert `$gte` to Date
        new Date(value.$lte).toISOString().split("T"), // Convert `$lte` to Date
      ];
    }
    return null; // Return null if the query does not contain `$gte` and `$lte` properties.
  },

  /**
   * Reverse transformer for extracting a greater than or equal to value from a query.
   *
   * @param {Object} value - The query object containing `$gte`.
   * @returns {any|null} - The value or null if `$gte` is not present.
   */
  greaterThanOrEqual: (value) => {
    if (value && value.$gte !== undefined) {
      return value.$gte; // Return the value of `$gte`.
    }
    return null; // Return null if `$gte` is not present.
  },

  /**
   * Reverse transformer for extracting a less than or equal to value from a query.
   *
   * @param {Object} value - The query object containing `$lte`.
   * @returns {any|null} - The value or null if `$lte` is not present.
   */
  lessThanOrEqual: (value) => {
    if (value && value.$lte !== undefined) {
      return value.$lte; // Return the value of `$lte`.
    }
    return null; // Return null if `$lte` is not present.
  },

  /**
   * Reverse transformer for extracting a greater than value from a query.
   *
   * @param {Object} value - The query object containing `$gt`.
   * @returns {any|null} - The value or null if `$gt` is not present.
   */
  greaterThan: (value) => {
    if (value && value.$gt !== undefined) {
      return value.$gt; // Return the value of `$gt`.
    }
    return null; // Return null if `$gt` is not present.
  },

  /**
   * Reverse transformer for extracting a less than value from a query.
   *
   * @param {Object} value - The query object containing `$lt`.
   * @returns {any|null} - The value or null if `$lt` is not present.
   */
  lessThan: (value) => {
    if (value && value.$lt !== undefined) {
      return value.$lt; // Return the value of `$lt`.
    }
    return null; // Return null if `$lt` is not present.
  },

  /**
   * Reverse transformer for extracting a not equal to value from a query.
   *
   * @param {Object} value - The query object containing `$ne`.
   * @returns {any|null} - The value or null if `$ne` is not present.
   */
  notEqual: (value) => {
    if (value && value.$ne !== undefined) {
      return value.$ne; // Return the value of `$ne`.
    }
    return null; // Return null if `$ne` is not present.
  },

  /**
   * Reverse transformer for extracting a between range from a query.
   *
   * @param {Object} value - The query object containing `$between`.
   * @returns {Array<any>|null} - The array of values or null if `$between` is not present.
   */
  between: (value) => {
    if (value && Array.isArray(value.$between)) {
      return value.$between; // Return the array of values.
    }
    return null; // Return null if `$between` is not present.
  },

  /**
   * Reverse transformer for extracting a not between range from a query.
   *
   * @param {Object} value - The query object containing `$notBetween`.
   * @returns {Array<any>|null} - The array of values or null if `$notBetween` is not present.
   */
  notBetween: (value) => {
    if (value && Array.isArray(value.$notBetween)) {
      return value.$notBetween; // Return the array of values.
    }
    return null; // Return null if `$notBetween` is not present.
  },

  /**
   * Reverse transformer for extracting an is null condition from a query.
   *
   * @param {Object} value - The query object containing `$isNull`.
   * @returns {boolean|null} - True if `$isNull` is present, otherwise null.
   */
  isNull: (value) => {
    if (value && value.$isNull === true) {
      return true; // Return true if `$isNull` is present.
    }
    return null; // Return null if `$isNull` is not present.
  },

  /**
   * Reverse transformer for extracting an is not null condition from a query.
   *
   * @param {Object} value - The query object containing `$isNotNull`.
   * @returns {boolean|null} - True if `$isNotNull` is present, otherwise null.
   */
  isNotNull: (value) => {
    if (value && value.$isNotNull === true) {
      return true; // Return true if `$isNotNull` is present.
    }
    return null; // Return null if `$isNotNull` is not present.
  },

  /**
   * Reverse transformer for extracting a like condition from a query.
   *
   * @param {Object} value - The query object containing `$like`.
   * @returns {string|null} - The value without the '%' wildcards or null if `$like` is not present.
   */
  like: (value) => {
    if (value && typeof value.$like === "string") {
      return value.$like.replace(/%/g, ""); // Return the value without '%' wildcards.
    }
    return null; // Return null if `$like` is not present.
  },

  /**
   * Reverse transformer for extracting a not like condition from a query.
   *
   * @param {Object} value - The query object containing `$notLike`.
   * @returns {string|null} - The value without the '%' wildcards or null if `$notLike` is not present.
   */
  notLike: (value) => {
    if (value && typeof value.$notLike === "string") {
      return value.$notLike.replace(/%/g, ""); // Return the value without '%' wildcards.
    }
    return null; // Return null if `$notLike` is not present.
  },

  /**
   * Reverse transformer for extracting an ilike (case-insensitive like) condition from a query.
   *
   * @param {Object} value - The query object containing `$ilike`.
   * @returns {string|null} - The value without the '%' wildcards or null if `$ilike` is not present.
   */
  ilike: (value) => {
    if (value && typeof value.$ilike === "string") {
      return value.$ilike.replace(/%/g, ""); // Return the value without '%' wildcards.
    }
    return null; // Return null if `$ilike` is not present.
  },

  /**
 * Reverse transformer for extracting a starts with condition from a query.
 *
 * @param {Object} value - The query object containing `$startsWith`.
 * @returns {string|null} - The value of `$startsWith` or null if `$startsWith` is not present.
 */
  startsWith: (value) => {
    return value && typeof value.$startsWith === "string" ? value.$startsWith : null;
  },

  /**
   * Reverse transformer for extracting a not starts with condition from a query.
   *
   * @param {Object} value - The query object containing `$notStartsWith`.
   * @returns {string|null} - The value of `$notStartsWith` or null if `$notStartsWith` is not present.
   */
  notStartsWith: (value) => {
    return value && typeof value.$notStartsWith === "string" ? value.$notStartsWith : null;
  },

  /**
   * Reverse transformer for extracting an ends with condition from a query.
   *
   * @param {Object} value - The query object containing `$endsWith`.
   * @returns {string|null} - The value of `$endsWith` or null if `$endsWith` is not present.
   */
  endsWith: (value) => {
    return value && typeof value.$endsWith === "string" ? value.$endsWith : null;
  },

  /**
   * Reverse transformer for extracting a not ends with condition from a query.
   *
   * @param {Object} value - The query object containing `$notEndsWith`.
   * @returns {string|null} - The value of `$notEndsWith` or null if `$notEndsWith` is not present.
   */
  notEndsWith: (value) => {
    return value && typeof value.$notEndsWith === "string" ? value.$notEndsWith : null;
  },
  /**
   * Reverse transformer for extracting a regex condition from a query.
   *
   * @param {Object} value - The query object containing `$regex`.
   * @returns {string|null} - The regex pattern or null if `$regex` is not present.
   */
  regex: (value) => {
    if (value && typeof value.$regex === "string") {
      return value.$regex; // Return the regex pattern.
    }
    return null; // Return null if `$regex` is not present.
  },

  /**
   * Reverse transformer for extracting a not regex condition from a query.
   *
   * @param {Object} value - The query object containing `$notRegex`.
   * @returns {string|null} - The regex pattern or null if `$notRegex` is not present.
   */
  notRegex: (value) => {
    if (value && typeof value.$notRegex === "string") {
      return value.$notRegex; // Return the regex pattern.
    }
    return null; // Return null if `$notRegex` is not present.
  },

  /**
   * Reverse transformer for extracting a case-insensitive regex condition from a query.
   *
   * @param {Object} value - The query object containing `$regexi`.
   * @returns {string|null} - The regex pattern or null if `$regexi` is not present.
   */
  regexi: (value) => {
    if (value && typeof value.$regexi === "string") {
      return value.$regexi; // Return the regex pattern.
    }
    return null; // Return null if `$regexi` is not present.
  },

  /**
   * Reverse transformer for extracting a case-insensitive not regex condition from a query.
   *
   * @param {Object} value - The query object containing `$notRegexi`.
   * @returns {string|null} - The regex pattern or null if `$notRegexi` is not present.
   */
  notRegexi: (value) => {
    if (value && typeof value.$notRegexi === "string") {
      return value.$notRegexi; // Return the regex pattern.
    }
    return null; // Return null if `$notRegexi` is not present.
  },
};

export default reverseQueryTransformers;
