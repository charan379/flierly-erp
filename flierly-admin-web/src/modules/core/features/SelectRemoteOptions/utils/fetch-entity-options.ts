import selectRemoteOptionsService from "../service";

// Define the response model type (assuming structure based on the response used)
interface EntityOption {
  entity: string
}

async function fetchEntityOptions(value: string): Promise<{ label: string; value: string }[]> {
  // Call the remote service
  const response: ApiResponse<EntityOption[]> = await selectRemoteOptionsService.entities({
    keyword: value === "focus" ? "" : value,
  })

  // Check if the response is successful and contains valid data
  if (response?.success && response?.result && Array.isArray(response.result)) {
    return response.result.map((model) => ({
      label: model.entity,
      value: model.entity,
    }))
  }

  // Return an empty array if the response is invalid
  return []
}

export default fetchEntityOptions
