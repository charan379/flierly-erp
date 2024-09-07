import reverseQueryTransformers from "./reverseQueryTransformers";

/**
 * Reverse transforms a query object to its original values.
 *
 * @param {Object} query - The query object to be transformed.
 * @returns {Object} - The transformed query object with original values.
 */
const reverseTransformQuery = (query) => {
  const result = {};

  Object.entries(query).forEach(([key, value]) => {
    switch (true) {
      case value !== null && typeof value === "string" && /^\/(.*)\/([gimsuy]*)$/.test(value): {
        // Apply the textWithRegex transformer if the value is a regex pattern string
        result[key] = reverseQueryTransformers.textWithRegex(value);
        break;
      }
      case value !== null && typeof value === "object" && Object.prototype.hasOwnProperty.call(value, "$in"): {
        // Apply the inArray transformer if the value is an $in query
        result[key] = reverseQueryTransformers.inArray(value);
        break;
      }
      case typeof value === "object" && value !== null && Object.prototype.hasOwnProperty.call(value, "$gte") && Object.prototype.hasOwnProperty.call(value, "$lte"): {
        // Apply the dateRange transformer if the value contains $gte and $lte
        result[key] = reverseQueryTransformers.dateRange(value);
        break;
      }
      default: {
        // Handle other possible formats or assign the value directly
        result[key] = value;
        break;
      }
    }
  });

  return result;
};

export default reverseTransformQuery;
