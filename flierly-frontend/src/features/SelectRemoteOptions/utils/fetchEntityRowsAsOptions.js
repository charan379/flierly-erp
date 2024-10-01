import selectRemoteOptionsService from "@/features/SelectRemoteOptions/service";

async function fetchEntityRowsAsOptions(entity, filters, limit, processResult) {
  const response = await selectRemoteOptionsService.entityRows({ entity, filters, limit });
  if (response?.success && response?.result && Array.isArray(response.result)) {
    return processResult(response.result);
  }
}

export default fetchEntityRowsAsOptions;
