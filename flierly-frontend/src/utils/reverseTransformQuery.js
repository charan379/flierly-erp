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
    if (value !== null && typeof value === "object") {
      const operator = Object.keys(value)[0];
      switch (operator) {
        case "$in":
          result[key] = reverseQueryTransformers.inArray(value);
          break;
        case "$gte":
          result[key] = reverseQueryTransformers.greaterThanOrEqual(value);
          break;
        case "$lte":
          result[key] = reverseQueryTransformers.lessThanOrEqual(value);
          break;
        case "$gt":
          result[key] = reverseQueryTransformers.greaterThan(value);
          break;
        case "$lt":
          result[key] = reverseQueryTransformers.lessThan(value);
          break;
        case "$ne":
          result[key] = reverseQueryTransformers.notEqual(value);
          break;
        case "$between":
          result[key] = reverseQueryTransformers.between(value);
          break;
        case "$notBetween":
          result[key] = reverseQueryTransformers.notBetween(value);
          break;
        case "$isNull":
          result[key] = reverseQueryTransformers.isNull(value);
          break;
        case "$isNotNull":
          result[key] = reverseQueryTransformers.isNotNull(value);
          break;
        case "$like":
          result[key] = reverseQueryTransformers.like(value);
          break;
        case "$notLike":
          result[key] = reverseQueryTransformers.notLike(value);
          break;
        case "$ilike":
          result[key] = reverseQueryTransformers.ilike(value);
          break;
        case "$notIlike":
          result[key] = reverseQueryTransformers.notIlike(value);
          break;
        case "$startsWith":
          result[key] = reverseQueryTransformers.startsWith(value);
          break;
        case "$notStartsWith":
          result[key] = reverseQueryTransformers.notStartsWith(value);
          break;
        case "$endsWith":
          result[key] = reverseQueryTransformers.endsWith(value);
          break;
        case "$notEndsWith":
          result[key] = reverseQueryTransformers.notEndsWith(value);
          break;
        case "$regex":
          result[key] = reverseQueryTransformers.regex(value);
          break;
        case "$notRegex":
          result[key] = reverseQueryTransformers.notRegex(value);
          break;
        case "$regexi":
          result[key] = reverseQueryTransformers.regexi(value);
          break;
        case "$notRegexi":
          result[key] = reverseQueryTransformers.notRegexi(value);
          break;
        default:
          result[key] = reverseTransformQuery(value); // Recursively handle nested objects
          break;
      }
    } else if (typeof value === "string" && /^\/(.*)\/([gimsuy]*)$/.test(value)) {
      // Apply the textWithRegex transformer if the value is a regex pattern string
      result[key] = reverseQueryTransformers.textWithRegex(value);
    } else {
      result[key] = value; // Direct equality condition
    }
  });

  return result;
};

export default reverseTransformQuery;
