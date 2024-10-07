import selectRemoteOptionsService from "@/features/SelectRemoteOptions/service";

/**
 * Fetch entity rows and transform them into options for a select component.
 * 
 * @param {string} entity - The name of the entity to fetch rows from.
 * @param {object} filters - Optional filters to apply to the entity rows.
 * @param {number} limit - The maximum number of rows to fetch.
 * @param {function} processResult - Function to process the fetched results.
 * @param {AbortSignal} signal - Optional AbortSignal to cancel the request.
 * @returns {Promise<Array>} - Processed options array.
 */
async function fetchEntityRowsAsOptions(entity, filters, limit, processResult, signal) {
  const response = await selectRemoteOptionsService.entityRows({ entity, filters, limit, signal });
  if (response?.success && response?.result && Array.isArray(response.result)) {
    return processResult(response.result);
  }
  return [];
}

export default fetchEntityRowsAsOptions;
