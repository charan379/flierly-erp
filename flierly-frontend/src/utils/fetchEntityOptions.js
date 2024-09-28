import selectRemoteOptionsService from "@/features/SelectRemoteOptions/service";

async function fetchEnityOptions(value) {
  const response = await selectRemoteOptionsService.entities({
    keyword: value,
  });
  if (response?.success && response?.result && Array.isArray(response.result)) {
    return response.result.map((model) => {
      return { label: model.entity, value: model.entity };
    });
  }
}

export default fetchEnityOptions;
