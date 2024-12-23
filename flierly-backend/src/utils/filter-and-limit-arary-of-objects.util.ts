/**
 * Filters and limits an array of objects based on a regular expression and a specified property.
 */
function filterAndLimit<T> (args: FilterAndLimitArgs<T>): T[] {
  const { data, matcher, limit, queryKey } = args;

  // Reduce the data array to accumulate items that match the regex and within the limit
  return data.reduce((filteredItems: T[], item: T) => {
    // Check if the accumulated items are less than the limit and the item matches the regex
    if (filteredItems.length < limit && matcher.test(String(item[queryKey]))) {
      filteredItems.push(item); // Add the item to the result array
    }
    return filteredItems; // Return the accumulator for the next iteration
  }, []);
}

export default filterAndLimit;
