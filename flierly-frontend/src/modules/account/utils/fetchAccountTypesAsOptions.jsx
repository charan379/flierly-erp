import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions";

const fetchAccountTypesAsOptions = (value, signal) => {
  let filters = {};
  if (value) {
    filters = { name: { $ilike: `%${value}%` } };
  }
  return fetchEntityRowsAsOptions(
    "account-type",
    filters,
    10,
    (accountTypes) => {
      return accountTypes.map((acType) => {
        return { label: acType.name, value: acType.id };
      });
    },
    signal
  );
};

export default fetchAccountTypesAsOptions;
