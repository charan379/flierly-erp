import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions";

const fetchAccountTypesAsOptions = (value) => {
    let filters = {};
    if (value) {
        filters = { name: { $ilike: `%${value}%` } };
    }
    return fetchEntityRowsAsOptions("account-type", filters, 10, (accountTypes) => {
        return accountTypes.map((acType) => {
            return { label: acType.name, value: acType.id }
        })
    })
};

export default fetchAccountTypesAsOptions;