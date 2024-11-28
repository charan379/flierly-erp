import selectRemoteOptionsService from "@/features/SelectRemoteOptions/service";

interface EntityRow {
  // Add the properties of the entity row as needed, based on the response structure
  [key: string]: any;  // This can be typed more strictly depending on the actual structure
}

type ProcessResultFunction = (result: EntityRow[]) => Array<{ label: string; value: string }>;

/**
 * Fetch entity rows and transform them into options for a select component.
 * 
 * @param {string} entity - The name of the entity to fetch rows from.
 * @param {object} filters - Optional filters to apply to the entity rows.
 * @param {number} limit - The maximum number of rows to fetch.
 * @param {ProcessResultFunction} processResult - Function to process the fetched results.
 * @param {AbortSignal} signal - Optional AbortSignal to cancel the request.
 * @returns {Promise<Array>} - Processed options array.
 */
async function fetchEntityRowsAsOptions(
  entity: string,
  filters: Record<string, any>,  // Assuming filters are an object, type this based on your actual filter structure
  limit: number,
  processResult: ProcessResultFunction,
  signal?: AbortSignal
): Promise<Array<{ label: string; value: string }>> {
  // Fetch data from the service
  const response: ApiResponse<EntityRow[]> = await selectRemoteOptionsService.entityRows({ entity, filters, limit, signal });

  // Check for valid response and process results
  if (response?.success && response?.result && Array.isArray(response.result)) {
    return processResult(response.result);
  }

  // Return an empty array if the response is invalid or empty
  return [];
}

export default fetchEntityRowsAsOptions;
