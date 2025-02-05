import SortDTO from "@/modules/core/dto/Sort.dto";

/**
 * Builds a page response object with pagination metadata.
 *
 * @template T The type of data in the page response.
 * @param {T[]} data The array of data for the current page.
 * @param {number} page The current page number (1-indexed).
 * @param {number} pageSize The number of items per page.
 * @param {number} totalResults The total number of items across all pages.
 * @param {object} sort The sorting criteria for the data.
 * @returns {Page<T>} The page response object with pagination metadata.
 */
function pageResponseBuilder<T>(data: T[], page: number, pageSize: number, totalResults: number, sort?: SortDTO): Page<T> {
  // Calculate the total number of pages based on the total results and page size.
  const totalPages = Math.ceil(totalResults / pageSize);

  // Determine if there is a next page based on the current page and total pages.
  const hasNextPage = page < totalPages;

  // Determine if there is a previous page based on the current page and total pages.
  const hasPreviousPage = page > 1 && totalPages > 0;

  // Return the page response object with pagination metadata.
  return {
    data, // The array of data for the current page.
    page, // The current page number (1-indexed).
    pageSize, // The number of items per page.
    totalResults, // The total number of items across all pages.
    totalPages, // The total number of pages.
    sort, // The sorting criteria for the data.
    hasNextPage, // Whether there is a next page.
    hasPreviousPage, // Whether there is a previous page.
    nextPage: hasNextPage ? page + 1 : undefined, // The next page number (or undefined if no next page).
    previousPage: hasPreviousPage ? page - 1 : undefined, // The previous page number (or undefined if no previous page).
  };
}

export default pageResponseBuilder;